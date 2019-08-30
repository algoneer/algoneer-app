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
        const explanation = shapArrayProps.explanations[id];
        return {
            'outNames': [
                'output value',
            ],
            'baseValue': shapArrayProps.baseValue,
            'outValue': explanation.outValue,
            'link': 'identity',
            'featureNames': shapArrayProps.featureNames,
            'features': explanation.features,
            'plot_cmap': 'RdBu',
            'labelMargin': 20,
        };
    }

    render() {
        return (
            <Fragment>
                <AdditiveForceArrayVisualizer
                    {...shapArrayProps}
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
