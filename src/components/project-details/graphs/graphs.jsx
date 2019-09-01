import React, { Fragment } from 'react';
import AdditiveForceArrayVisualizer from './shap/AdditiveForceArrayVisualizer.jsx';
import AdditiveForceVisualizer from './shap/AdditiveForceVisualizer.jsx';

import shapArrayProps from './mock-data-array.json';


class Graphs extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            slice: this.loadSlice(0),
        };
    }

    loadSlice(id) {
        const {data} = this.props
        const explanation = data.explanations[id];
        return {
            'outNames': [
                'output value',
            ],
            'baseValue': data.baseValue,
            'outValue': explanation.outValue,
            'link': 'identity',
            'featureNames': data.featureNames,
            'features': explanation.features,
            'plot_cmap': 'RdBu',
            'labelMargin': 20,
        };
    }

    render() {
        const {data} = this.props
        return (
            <Fragment>
                <AdditiveForceArrayVisualizer
                    {...data}
                    onClickSlice={(value) => this.setState({
                        slice: this.loadSlice(value),
                    })}
                />
                {this.state.slice && (
                    <div> {/* Prevents the visualizer from overflowing. */}
                        <AdditiveForceVisualizer {...this.state.slice} />
                    </div>
                )}
            </Fragment>
        );
    }
}

export default Graphs;
