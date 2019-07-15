import React from 'react'
import {T} from '7s/components'

const Title = ({title, icon}) => 
    <span>
        <span className="icon is-small">
            <i className={"fas fa-"+icon} />
        </span>
        <T k={['nav', title, 'title']} />
    </span>

const menu = new Map([
    ['main', new Map([
        [
            'example',
            {
                title : <Title title='example' icon='sign-out-alt' />,
                route: 'example'
            },
        ],
    ])],
    ['nav', new Map([])]
])
export default menu