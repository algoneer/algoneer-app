// The MIT License (MIT)
//
// Copyright(c) 2018 Scott Lundberg
//
// https://github.com/slundberg/shap/blob/0c608c5d38e1e2e32d757c7759eee217d0f24af4/javascript/visualizers/AdditiveForceArrayVisualizer.jsx
/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { select, mouse } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { format } from 'd3-format';
import { timeFormat, timeParse } from 'd3-time-format';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { hsl } from 'd3-color';
import {
    sortBy,
    min,
    max,
    map,
    each,
    sum,
    filter,
    debounce,
    keys,
    range,
    rangeRight,
    cloneDeep,
    findKey,
} from 'lodash';
import colors from '../color-set';
import invLinkFunctions from '../inv-link-functions.js';

class AdditiveForceArrayVisualizer extends React.Component {
    constructor(props) {
        super(props);
        window.lastAdditiveForceArrayVisualizer = this;
        this.topOffset = 28;
        this.leftOffset = 80;
        this.height = 350;
        this.effectFormat = format('.2');
        this.redraw = debounce(() => this.draw(), 200);
        this.state = {
            invLinkFunction: AdditiveForceArrayVisualizer.getInvLinkFunction(this.props),
        };
    }

    static getInvLinkFunction({link, baseValue}) {
        if (!invLinkFunctions.hasOwnProperty(link)) {
            console.error('ERROR: Unrecognized link function: ', link);
            link = 'identity';
        }
        return invLinkFunctions[link]({baseValue});
    }

    static getDerivedStateFromProps(props, state) {
        if (props.baseValue !== state.baseValue || props.link !== state.link) {
            return {
                baseValue: props.baseValue,
                link: props.link,
                invLinkFunction: AdditiveForceArrayVisualizer.getInvLinkFunction(props),
            }
        }
        return null;
    }

    componentDidMount() {
        // create our permanent elements
        this.mainGroup = this.svg.append('g');
        this.onTopGroup = this.svg.append('g');
        this.xaxisElement = this.onTopGroup
            .append('g')
            .attr('transform', 'translate(0,35)')
            .attr('class', 'force-bar-array-xaxis');
        this.yaxisElement = this.onTopGroup
            .append('g')
            .attr('transform', 'translate(0,35)')
            .attr('class', 'force-bar-array-yaxis');
        this.hoverGroup1 = this.svg.append('g');
        this.hoverGroup2 = this.svg.append('g');
        this.baseValueTitle = this.svg.append('text');
        this.hoverLine = this.svg.append('line');
        this.hoverxOutline = this.svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-weight', 'bold')
            .attr('fill', '#fff')
            .attr('stroke', '#fff')
            .attr('stroke-width', '6')
            .attr('font-size', '12px');
        this.hoverx = this.svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-weight', 'bold')
            .attr('fill', '#000')
            .attr('font-size', '12px');
        this.hoverxTitle = this.svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('opacity', 0.6)
            .attr('font-size', '12px');
        this.hoveryOutline = this.svg
            .append('text')
            .attr('text-anchor', 'end')
            .attr('font-weight', 'bold')
            .attr('fill', '#fff')
            .attr('stroke', '#fff')
            .attr('stroke-width', '6')
            .attr('font-size', '12px');
        this.hovery = this.svg
            .append('text')
            .attr('text-anchor', 'end')
            .attr('font-weight', 'bold')
            .attr('fill', '#000')
            .attr('font-size', '12px');
        this.xlabel = this.wrapper.select('.additive-force-array-xlabel');
        this.ylabel = this.wrapper.select('.additive-force-array-ylabel');

        // Create our colors and color gradients
        //Verify custom color map
        let plot_colors = undefined;
        if (typeof this.props.plot_cmap === 'string') {
            if (!(this.props.plot_cmap in colors.colors)) {
                console.warn('Invalid color map name, reverting to default.');
                plot_colors = colors.colors.RdBu;
            }
            else {
                plot_colors = colors.colors[this.props.plot_cmap];
            }
        }
        else if (Array.isArray(this.props.plot_cmap)) {
            plot_colors = this.props.plot_cmap;
        }
        this.colors = plot_colors.map(x => hsl(x));
        this.brighterColors = [1.45, 1.6].map((v, i) => this.colors[i].brighter(v));

        // create our axes
        const defaultFormat = format(',.4');
        if ((this.props.ordering_keys !== null) && (this.props.ordering_keys_time_format !== null)) {
            this.parseTime = timeParse(this.props.ordering_keys_time_format);
            this.formatTime = timeFormat(this.props.ordering_keys_time_format);

            this.xtickFormat = (x) => {
                if (typeof (x) === 'object') {
                    return this.formatTime(x);
                } else {
                    return defaultFormat(x);
                }
            };

        } else {
            this.parseTime = null;
            this.formatTime = null;
            this.xtickFormat = defaultFormat;
        }
        this.xscale = scaleLinear();
        this.xaxis = axisBottom()
            .scale(this.xscale)
            .tickSizeInner(4)
            .tickSizeOuter(0)
            .tickFormat(d => this.xtickFormat(d))
            .tickPadding(-18);

        this.ytickFormat = defaultFormat;
        this.yscale = scaleLinear();
        this.yaxis = axisLeft()
            .scale(this.yscale)
            .tickSizeInner(4)
            .tickSizeOuter(0)
            .tickFormat(d => this.ytickFormat(this.state.invLinkFunction(d)))
            .tickPadding(2);

        this.xlabel.node().onchange = () => this.internalDraw();
        this.ylabel.node().onchange = () => this.internalDraw();

        this.svg.on('mousemove', x => this.mouseMoved(x));
        this.svg.on('click', () => this.props.onClickSlice(this.nearestExpIndex));

        this.svg.on('mouseout', x => this.mouseOut(x));

        // draw and then listen for resize events
        //this.draw();
        window.addEventListener('resize', this.redraw);
        window.setTimeout(this.redraw, 50); // re-draw after interface has updated
    }

    componentDidUpdate() {
        this.draw();
    }

    mouseOut() {
        this.hoverLine.attr('display', 'none');
        this.hoverx.attr('display', 'none');
        this.hoverxOutline.attr('display', 'none');
        this.hoverxTitle.attr('display', 'none');
        this.hovery.attr('display', 'none');
        this.hoveryOutline.attr('display', 'none');
        this.hoverGroup1.attr('display', 'none');
        this.hoverGroup2.attr('display', 'none');
    }

    mouseMoved() {
        let i, nearestExp;

        this.hoverLine.attr('display', '');
        this.hoverx.attr('display', '');
        this.hoverxOutline.attr('display', '');
        this.hoverxTitle.attr('display', '');
        this.hovery.attr('display', '');
        this.hoveryOutline.attr('display', '');
        this.hoverGroup1.attr('display', '');
        this.hoverGroup2.attr('display', '');

        const x = mouse(this.svg.node())[0];
        if (this.props.explanations) {
            for (i = 0; i < this.props.explanations.length; ++i) {
                if (
                    !nearestExp ||
                    Math.abs(nearestExp.xmapScaled - x) >
                    Math.abs(this.props.explanations[i].xmapScaled - x)
                ) {
                    nearestExp = this.props.explanations[i];
                    this.nearestExpIndex = i;
                }
            }

            this.hoverLine
                .attr('x1', nearestExp.xmapScaled)
                .attr('x2', nearestExp.xmapScaled)
                .attr('y1', 0 + this.topOffset)
                .attr('y2', this.height);
            this.hoverx
                .attr('x', nearestExp.xmapScaled)
                .attr('y', this.topOffset - 5)
                .text(this.xtickFormat(nearestExp.xmap));
            this.hoverxOutline
                .attr('x', nearestExp.xmapScaled)
                .attr('y', this.topOffset - 5)
                .text(this.xtickFormat(nearestExp.xmap));
            this.hoverxTitle
                .attr('x', nearestExp.xmapScaled)
                .attr('y', this.topOffset - 18)
                .text(
                    nearestExp.count > 1 ? nearestExp.count + ' averaged samples' : ''
                );
            this.hovery
                .attr('x', this.leftOffset - 6)
                .attr('y', nearestExp.joinPointy)
                .text(this.ytickFormat(this.state.invLinkFunction(nearestExp.joinPoint)));
            this.hoveryOutline
                .attr('x', this.leftOffset - 6)
                .attr('y', nearestExp.joinPointy)
                .text(this.ytickFormat(this.state.invLinkFunction(nearestExp.joinPoint)));

            const P = this.props.featureNames.length;

            const posFeatures = [];
            let lastPos, pos;
            for (let j = this.currPosOrderedFeatures.length - 1; j >= 0; --j) {
                const i = this.currPosOrderedFeatures[j];
                const d = nearestExp.features[i];
                pos = 5 + (d.posyTop + d.posyBottom) / 2;
                if (
                    (!lastPos || pos - lastPos >= 15) &&
                    d.posyTop - d.posyBottom >= 6
                ) {
                    posFeatures.push(d);
                    lastPos = pos;
                }
            }

            const negFeatures = [];
            lastPos = undefined;
            for (const i of this.currNegOrderedFeatures) {
                const d = nearestExp.features[i];
                pos = 5 + (d.negyTop + d.negyBottom) / 2;
                if (
                    (!lastPos || lastPos - pos >= 15) &&
                    d.negyTop - d.negyBottom >= 6
                ) {
                    negFeatures.push(d);
                    lastPos = pos;
                }
            }

            const labelFunc = d => {
                let valString = '';
                if (d.value !== null && d.value !== undefined) {
                    valString =
                        ' = ' + (isNaN(d.value) ? d.value : this.ytickFormat(d.value));
                }
                if (nearestExp.count > 1) {
                    return 'mean(' + this.props.featureNames[d.ind] + ')' + valString;
                } else {
                    return this.props.featureNames[d.ind] + valString;
                }
            };

            const featureHoverLabels1 = this.hoverGroup1
                .selectAll('.pos-values')
                .data(posFeatures);
            featureHoverLabels1
                .enter()
                .append('text')
                .attr('class', 'pos-values')
                .merge(featureHoverLabels1)
                .attr('x', nearestExp.xmapScaled + 5)
                .attr('y', d => 4 + (d.posyTop + d.posyBottom) / 2)
                .attr('text-anchor', 'start')
                .attr('font-size', 12)
                .attr('stroke', '#fff')
                .attr('fill', '#fff')
                .attr('stroke-width', '4')
                .attr('stroke-linejoin', 'round')
                .attr('opacity', 1)
                .text(labelFunc);
            featureHoverLabels1.exit().remove();

            const featureHoverLabels2 = this.hoverGroup2
                .selectAll('.pos-values')
                .data(posFeatures);
            featureHoverLabels2
                .enter()
                .append('text')
                .attr('class', 'pos-values')
                .merge(featureHoverLabels2)
                .attr('x', nearestExp.xmapScaled + 5)
                .attr('y', d => 4 + (d.posyTop + d.posyBottom) / 2)
                .attr('text-anchor', 'start')
                .attr('font-size', 12)
                .attr('fill', this.colors[0])
                .text(labelFunc);
            featureHoverLabels2.exit().remove();

            const featureHoverNegLabels1 = this.hoverGroup1
                .selectAll('.neg-values')
                .data(negFeatures);
            featureHoverNegLabels1
                .enter()
                .append('text')
                .attr('class', 'neg-values')
                .merge(featureHoverNegLabels1)
                .attr('x', nearestExp.xmapScaled + 5)
                .attr('y', d => 4 + (d.negyTop + d.negyBottom) / 2)
                .attr('text-anchor', 'start')
                .attr('font-size', 12)
                .attr('stroke', '#fff')
                .attr('fill', '#fff')
                .attr('stroke-width', '4')
                .attr('stroke-linejoin', 'round')
                .attr('opacity', 1)
                .text(labelFunc);
            featureHoverNegLabels1.exit().remove();

            const featureHoverNegLabels2 = this.hoverGroup2
                .selectAll('.neg-values')
                .data(negFeatures);
            featureHoverNegLabels2
                .enter()
                .append('text')
                .attr('class', 'neg-values')
                .merge(featureHoverNegLabels2)
                .attr('x', nearestExp.xmapScaled + 5)
                .attr('y', d => 4 + (d.negyTop + d.negyBottom) / 2)
                .attr('text-anchor', 'start')
                .attr('font-size', 12)
                .attr('fill', this.colors[1])
                .text(labelFunc);
            featureHoverNegLabels2.exit().remove();
        }
    }

    draw() {
        if (!this.props.explanations || this.props.explanations.length === 0)
            return;

        // record the order in which the explanations were given
        each(this.props.explanations, (x, i) => (x.origInd = i));

        // Find what features are actually used
        const posDefinedFeatures = {};
        const negDefinedFeatures = {};
        const definedFeaturesValues = {};
        for (const e of this.props.explanations) {
            for (const k in e.features) {
                if (posDefinedFeatures[k] === undefined) {
                    posDefinedFeatures[k] = 0;
                    negDefinedFeatures[k] = 0;
                    definedFeaturesValues[k] = 0;
                }
                if (e.features[k].effect > 0) {
                    posDefinedFeatures[k] += e.features[k].effect;
                } else {
                    negDefinedFeatures[k] -= e.features[k].effect;
                }
                if (e.features[k].value !== null && e.features[k].value !== undefined) {
                    definedFeaturesValues[k] += 1;
                }
            }
        }
        this.usedFeatures = sortBy(
            keys(posDefinedFeatures),
            i => -(posDefinedFeatures[i] + negDefinedFeatures[i])
        );
        //console.log('found ', this.usedFeatures.length, ' used features');

        this.posOrderedFeatures = sortBy(
            this.usedFeatures,
            i => posDefinedFeatures[i]
        );
        this.negOrderedFeatures = sortBy(
            this.usedFeatures,
            i => -negDefinedFeatures[i]
        );
        this.singleValueFeatures = filter(
            this.usedFeatures,
            i => definedFeaturesValues[i] > 0
        );

        let options = [
            'sample order by similarity',
            'sample order by output value',
            'original sample ordering',
        ].concat(this.singleValueFeatures.map(i => this.props.featureNames[i]));
        if (this.props.ordering_keys !== null) {
            options.unshift('sample order by key');
        }

        const xLabelOptions = this.xlabel.selectAll('option').data(options);
        xLabelOptions
            .enter()
            .append('option')
            .merge(xLabelOptions)
            .attr('value', d => d)
            .text(d => d);
        xLabelOptions.exit().remove();

        const n = this.props.outNames[0]
            ? this.props.outNames[0]
            : 'model output value';
        options = map(this.usedFeatures, i => [
            this.props.featureNames[i],
            this.props.featureNames[i] + ' effects',
        ]);
        options.unshift(['model output value', n]);
        const yLabelOptions = this.ylabel.selectAll('option').data(options);
        yLabelOptions
            .enter()
            .append('option')
            .merge(yLabelOptions)
            .attr('value', d => d[0])
            .text(d => d[1]);
        yLabelOptions.exit().remove();

        this.ylabel
            .style(
                'top',
                (this.height - 10 - this.topOffset) / 2 + this.topOffset + 'px'
            )
            .style('left', 10 - this.ylabel.node().offsetWidth / 2 + 'px');
        this.internalDraw();
    }

    internalDraw() {
        // we fill in any implicit feature values and assume they have a zero effect and value
        for (const e of this.props.explanations) {
            for (const i of this.usedFeatures) {
                if (!e.features.hasOwnProperty(i)) {
                    e.features[i] = { effect: 0, value: 0 };
                }
                e.features[i].ind = i;
            }
        }

        let explanations;
        const xsort = this.xlabel.node().value;


        // Set scaleTime if time ticks provided for original ordering
        const isTimeScale = ((xsort === 'sample order by key') &&
            (this.props.ordering_keys_time_format !== null));
        if (isTimeScale) {
            this.xscale = scaleTime();
        } else {
            this.xscale = scaleLinear();
        }
        this.xaxis.scale(this.xscale);


        if (xsort === 'sample order by similarity') {
            explanations = sortBy(this.props.explanations, x => x.simIndex);
            each(explanations, (e, i) => (e.xmap = i));
        } else if (xsort === 'sample order by output value') {
            explanations = sortBy(this.props.explanations, x => -x.outValue);
            each(explanations, (e, i) => (e.xmap = i));
        } else if (xsort === 'original sample ordering') {
            explanations = sortBy(this.props.explanations, x => x.origInd);
            each(explanations, (e, i) => (e.xmap = i));
        } else if (xsort === 'sample order by key') {
            explanations = this.props.explanations;
            if (isTimeScale) {
                each(explanations, (e, i) => (e.xmap = this.parseTime(this.props.ordering_keys[i])));
            } else {
                each(explanations, (e, i) => (e.xmap = this.props.ordering_keys[i]));
            }
            explanations = sortBy(explanations, e => e.xmap);
        } else {
            const ind = findKey(this.props.featureNames, x => x === xsort);
            each(this.props.explanations, (e, i) => (e.xmap = e.features[ind].value));
            const explanations2 = sortBy(this.props.explanations, x => x.xmap);
            const xvals = map(explanations2, x => x.xmap);
            if (typeof xvals[0] === 'string') {
                alert('Ordering by category names is not yet supported.');
                return;
            }
            const xmin = min(xvals);
            const xmax = max(xvals);
            const binSize = (xmax - xmin) / 100;

            // Build explanations where effects are averaged when the x values are identical
            explanations = [];
            let laste, copye, e;
            for (let i = 0; i < explanations2.length; ++i) {
                const e = explanations2[i];
                if (
                    (laste && (!copye && e.xmap - laste.xmap <= binSize)) ||
                    (copye && e.xmap - copye.xmap <= binSize)
                ) {
                    if (!copye) {
                        copye = cloneDeep(laste);
                        copye.count = 1;
                    }
                    for (const j of this.usedFeatures) {
                        copye.features[j].effect += e.features[j].effect;
                        copye.features[j].value += e.features[j].value;
                    }
                    copye.count += 1;
                } else if (laste) {
                    if (copye) {
                        for (const j of this.usedFeatures) {
                            copye.features[j].effect /= copye.count;
                            copye.features[j].value /= copye.count;
                        }
                        explanations.push(copye);
                        copye = undefined;
                    } else {
                        explanations.push(laste);
                    }
                }
                laste = e;
            }
            if (laste.xmap - explanations[explanations.length - 1].xmap > binSize) {
                explanations.push(laste);
            }
        }

        // adjust for the correct y-value we are plotting
        this.currUsedFeatures = this.usedFeatures;
        this.currPosOrderedFeatures = this.posOrderedFeatures;
        this.currNegOrderedFeatures = this.negOrderedFeatures;
        //let filteredFeatureNames = this.props.featureNames;
        const yvalue = this.ylabel.node().value;
        if (yvalue !== 'model output value') {
            explanations = cloneDeep(explanations);
            const ind = findKey(this.props.featureNames, x => x === yvalue);

            for (let i = 0; i < explanations.length; ++i) {
                const v = explanations[i].features[ind];
                explanations[i].features = {};
                explanations[i].features[ind] = v;
            }
            //filteredFeatureNames = [this.props.featureNames[ind]];
            this.currUsedFeatures = [ind];
            this.currPosOrderedFeatures = [ind];
            this.currNegOrderedFeatures = [ind];
        }
        this.currExplanations = explanations;

        this.predValues = map(explanations, e =>
            sum(map(e.features, x => x.effect))
        );

        const width = this.wrapper.node().offsetWidth;
        if (width === 0) return setTimeout(() => this.draw(explanations), 500);

        this.svg.style('height', this.height + 'px');
        this.svg.style('width', width + 'px');

        const xvals = map(explanations, x => x.xmap);
        this.xscale
            .domain([min(xvals), max(xvals)])
            .range([this.leftOffset, width])
            .clamp(true);
        this.xaxisElement
            .attr('transform', 'translate(0,' + this.topOffset + ')')
            .call(this.xaxis);

        for (let i = 0; i < this.currExplanations.length; ++i) {
            this.currExplanations[i].xmapScaled = this.xscale(
                this.currExplanations[i].xmap
            );
        }

        const N = explanations.length;
        let domainSize = 0;
        for (let ind = 0; ind < N; ++ind) {
            const data2 = explanations[ind].features;
            //if (data2.length !== P) error("Explanations have differing numbers of features!");
            const totalPosEffects =
                sum(map(filter(data2, x => x.effect > 0), x => x.effect)) || 0;
            const totalNegEffects =
                sum(map(filter(data2, x => x.effect < 0), x => -x.effect)) || 0;
            domainSize = Math.max(
                domainSize,
                Math.max(totalPosEffects, totalNegEffects) * 2.2
            );
        }
        this.yscale
            .domain([-domainSize / 2, domainSize / 2])
            .range([this.height - 10, this.topOffset]);
        this.yaxisElement
            .attr('transform', 'translate(' + this.leftOffset + ',0)')
            .call(this.yaxis);

        for (let ind = 0; ind < N; ++ind) {
            const data2 = explanations[ind].features;
            //console.log(length(data2))

            const totalEffect = sum(map(data2, x => Math.abs(x.effect)));
            const totalNegEffects =
                sum(map(filter(data2, x => x.effect < 0), x => -x.effect)) || 0;

            //let scaleOffset = height/2 - this.yscale(totalNegEffects);

            // calculate the position of the join point between positive and negative effects
            // and also the positions of each feature effect block
            let pos = -totalNegEffects,
                i;
            for (i of this.currPosOrderedFeatures) {
                data2[i].posyTop = this.yscale(pos);
                if (data2[i].effect > 0) pos += data2[i].effect;
                data2[i].posyBottom = this.yscale(pos);
                data2[i].ind = i;
            }
            const joinPoint = pos;
            for (i of this.currNegOrderedFeatures) {
                data2[i].negyTop = this.yscale(pos);
                if (data2[i].effect < 0) pos -= data2[i].effect;
                data2[i].negyBottom = this.yscale(pos);
            }
            explanations[ind].joinPoint = joinPoint;
            explanations[ind].joinPointy = this.yscale(joinPoint);
        }

        const lineFunction = line()
            .x(d => d[0])
            .y(d => d[1]);

        const areasPos = this.mainGroup
            .selectAll('.force-bar-array-area-pos')
            .data(this.currUsedFeatures);
        areasPos
            .enter()
            .append('path')
            .attr('class', 'force-bar-array-area-pos')
            .merge(areasPos)
            .attr('d', i => {
                const topPoints = map(range(N), j => [
                    explanations[j].xmapScaled,
                    explanations[j].features[i].posyTop,
                ]);
                const bottomPoints = map(rangeRight(N), j => [
                    explanations[j].xmapScaled,
                    explanations[j].features[i].posyBottom,
                ]);
                return lineFunction(topPoints.concat(bottomPoints));
            })
            .attr('fill', this.colors[0]);
        areasPos.exit().remove();

        const areasNeg = this.mainGroup
            .selectAll('.force-bar-array-area-neg')
            .data(this.currUsedFeatures);
        areasNeg
            .enter()
            .append('path')
            .attr('class', 'force-bar-array-area-neg')
            .merge(areasNeg)
            .attr('d', i => {
                const topPoints = map(range(N), j => [
                    explanations[j].xmapScaled,
                    explanations[j].features[i].negyTop,
                ]);
                const bottomPoints = map(rangeRight(N), j => [
                    explanations[j].xmapScaled,
                    explanations[j].features[i].negyBottom,
                ]);
                return lineFunction(topPoints.concat(bottomPoints));
            })
            .attr('fill', this.colors[1]);
        areasNeg.exit().remove();

        const dividersPos = this.mainGroup
            .selectAll('.force-bar-array-divider-pos')
            .data(this.currUsedFeatures);
        dividersPos
            .enter()
            .append('path')
            .attr('class', 'force-bar-array-divider-pos')
            .merge(dividersPos)
            .attr('d', i => {
                const points = map(range(N), j => [
                    explanations[j].xmapScaled,
                    explanations[j].features[i].posyBottom,
                ]);
                return lineFunction(points);
            })
            .attr('fill', 'none')
            .attr('stroke-width', 1)
            .attr('stroke', d => this.colors[0].brighter(1.2));
        dividersPos.exit().remove();

        const dividersNeg = this.mainGroup
            .selectAll('.force-bar-array-divider-neg')
            .data(this.currUsedFeatures);
        dividersNeg
            .enter()
            .append('path')
            .attr('class', 'force-bar-array-divider-neg')
            .merge(dividersNeg)
            .attr('d', i => {
                const points = map(range(N), j => [
                    explanations[j].xmapScaled,
                    explanations[j].features[i].negyTop,
                ]);
                return lineFunction(points);
            })
            .attr('fill', 'none')
            .attr('stroke-width', 1)
            .attr('stroke', d => this.colors[1].brighter(1.5));
        dividersNeg.exit().remove();

        const boxBounds = function (es, ind, starti, endi, featType) {
            let maxTop, minBottom;
            if (featType === 'pos') {
                maxTop = es[starti].features[ind].posyBottom;
                minBottom = es[starti].features[ind].posyTop;
            } else {
                maxTop = es[starti].features[ind].negyBottom;
                minBottom = es[starti].features[ind].negyTop;
            }
            let t, b;
            for (let i = starti + 1; i <= endi; ++i) {
                if (featType === 'pos') {
                    t = es[i].features[ind].posyBottom;
                    b = es[i].features[ind].posyTop;
                } else {
                    t = es[i].features[ind].negyBottom;
                    b = es[i].features[ind].negyTop;
                }
                if (t > maxTop) maxTop = t;
                if (b < minBottom) minBottom = b;
            }
            return { top: maxTop, bottom: minBottom };
        };

        const neededWidth = 100;
        const neededHeight = 20;
        const neededBuffer = 100;

        // find areas on the plot big enough for feature labels
        const featureLabels = [];
        for (const featType of ['pos', 'neg']) {
            for (const ind of this.currUsedFeatures) {
                let starti = 0,
                    endi = 0,
                    i,
                    boxWidth = 0,
                    hbounds = { top: 0, bottom: 0 };
                let newHbounds;
                while (endi < N - 1) {
                    // make sure our box is long enough
                    while (boxWidth < neededWidth && endi < N - 1) {
                        ++endi;
                        boxWidth =
                            explanations[endi].xmapScaled - explanations[starti].xmapScaled;
                    }

                    // and high enough
                    hbounds = boxBounds(explanations, ind, starti, endi, featType);
                    while (hbounds.bottom - hbounds.top < neededHeight && starti < endi) {
                        ++starti;
                        hbounds = boxBounds(explanations, ind, starti, endi, featType);
                    }
                    boxWidth =
                        explanations[endi].xmapScaled - explanations[starti].xmapScaled;

                    // we found a spot!
                    if (
                        hbounds.bottom - hbounds.top >= neededHeight &&
                        boxWidth >= neededWidth
                    ) {
                        //console.log(`found a spot! ind: ${ind}, starti: ${starti}, endi: ${endi}, hbounds:`, hbounds)
                        // make our box as long as possible
                        while (endi < N - 1) {
                            ++endi;
                            newHbounds = boxBounds(explanations, ind, starti, endi, featType);
                            if (newHbounds.bottom - newHbounds.top > neededHeight) {
                                hbounds = newHbounds;
                            } else {
                                --endi;
                                break;
                            }
                        }
                        boxWidth =
                            explanations[endi].xmapScaled - explanations[starti].xmapScaled;
                        //console.log("found  ",boxWidth,hbounds)

                        featureLabels.push([
                            (explanations[endi].xmapScaled +
                                explanations[starti].xmapScaled) /
                            2,
                            (hbounds.top + hbounds.bottom) / 2,
                            this.props.featureNames[ind],
                        ]);

                        const lastEnd = explanations[endi].xmapScaled;
                        starti = endi;
                        while (
                            lastEnd + neededBuffer > explanations[starti].xmapScaled &&
                            starti < N - 1
                        ) {
                            ++starti;
                        }
                        endi = starti;
                    }
                }
            }
        }

        const featureLabelText = this.onTopGroup
            .selectAll('.force-bar-array-flabels')
            .data(featureLabels);
        featureLabelText
            .enter()
            .append('text')
            .attr('class', 'force-bar-array-flabels')
            .merge(featureLabelText)
            .attr('x', d => d[0])
            .attr('y', d => d[1] + 4)
            .text(d => d[2]);
        featureLabelText.exit().remove();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.redraw);
    }

    render() {
        return (
            <div
                ref={x => (this.wrapper = select(x))}
                style={{ textAlign: 'center' }}
            >
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
          .force-bar-array-wrapper {
            text-align: center;
          }
          .force-bar-array-xaxis path {
            fill: none;
            opacity: 0.4;
          }
          .force-bar-array-xaxis .domain {
            opacity: 0;
          }
          .force-bar-array-xaxis paths {
            display: none;
          }
          .force-bar-array-yaxis path {
            fill: none;
            opacity: 0.4;
          }
          .force-bar-array-yaxis paths {
            display: none;
          }
          .tick line {
            stroke: #000;
            stroke-width: 1px;
            opacity: 0.4;
          }
          .tick text {
            fill: #000;
            opacity: 0.5;
            font-size: 12px;
            padding: 0px;
          }
          .force-bar-array-flabels {
            font-size: 12px;
            fill: #fff;
            text-anchor: middle;
          }
          .additive-force-array-xlabel {
            background: none;
            border: 1px solid #ccc;
            opacity: 0.5;
            margin-bottom: 0px;
            font-size: 12px;
            font-family: arial;
            margin-left: 80px;
            max-width: 300px;
          }
          .additive-force-array-xlabel:focus {
            outline: none;
          }
          .additive-force-array-ylabel {
            position: relative;
            top: 0px;
            left: 0px;
            transform: rotate(-90deg);
            background: none;
            border: 1px solid #ccc;
            opacity: 0.5;
            margin-bottom: 0px;
            font-size: 12px;
            font-family: arial;
            max-width: 150px;
          }
          .additive-force-array-ylabel:focus {
            outline: none;
          }
          .additive-force-array-hoverLine {
            stroke-width: 1px;
            stroke: #fff;
            opacity: 1;
          }`,
                    }}
                />
                <select className="additive-force-array-xlabel" />
                <div style={{ height: '0px', textAlign: 'left' }}>
                    <select className="additive-force-array-ylabel" />
                </div>
                <svg
                    ref={x => (this.svg = select(x))}
                    style={{
                        userSelect: 'none',
                        display: 'block',
                        fontFamily: 'arial',
                        sansSerif: true,
                    }}
                />
            </div>
        );
    }
}

AdditiveForceArrayVisualizer.defaultProps = {
    plot_cmap: 'RdBu',
    ordering_keys: null,
    ordering_keys_time_format: null,
};

AdditiveForceArrayVisualizer.propTypes = {
    baseValue: PropTypes.number.isRequired,
    explanations: PropTypes.arrayOf(PropTypes.shape({
        features: PropTypes.object,
        /*PropTypes.shape({
            effect: PropTypes.number.isRequired,
            ind: PropTypes.string.isRequired,
            negyBottom: PropTypes.number.isRequired,
            negyTop: PropTypes.number.isRequired,
            posyBottom: PropTypes.number.isRequired,
            posyTop: PropTypes.number.isRequired,
            value: PropTypes.number.isRequired,
        })),
        */
        joinPoint: PropTypes.number,
        joinPointy: PropTypes.number,
        origInd: PropTypes.number.isRequired,
        outValue: PropTypes.number.isRequired,
        simIndex: PropTypes.number.isRequired,
        xmapScaled: PropTypes.number,
    })).isRequired,
    featureNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.oneOf(['identity', 'logit']),
    ordering_keys: PropTypes.array,
    ordering_keys_time_format: PropTypes.string,
    outNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    /* Color map */
    plot_cmap: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    onClickSlice: PropTypes.func.isRequired,
};

export default AdditiveForceArrayVisualizer;
