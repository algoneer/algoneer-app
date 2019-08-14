import React, { PureComponent } from 'react';

class Empty extends PureComponent {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Path</th>
                        <th>Name</th>
                        <th>Date created</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>####</td>
                        <td>Ice Hockey vs. Field Hockey</td>
                        <td>Jul 13, 2019</td>
                        <td>passed</td>
                    </tr>
                    <tr>
                        <td>####</td>
                        <td>Kölner Dom vs. Aachener Dom</td>
                        <td>Jul 12, 2019</td>
                        <td>failed</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Empty;
