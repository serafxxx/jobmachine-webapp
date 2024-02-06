import React, {ReactNode} from 'react'

const Marker = ({id, className, children}) => (
    <marker
        className={className || 'react-flow__arrowhead'}
        id={id}
        markerWidth="25"
        markerHeight="25"
        viewBox="-10 -10 20 20"
        orient="auto"
        markerUnits="userSpaceOnUse"
        refX="0"
        refY="0"
    >
        {children}
    </marker>
)

export function MarkerDefinition({color, id}) {
    return (
        <svg>
            <defs>
                <Marker id={id}>
                    <polyline
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        fill={color}
                        points="-12,-4 0,0 -12,4 -12,-4"
                    />
                </Marker>
            </defs>
        </svg>
    )
}

// export function MarkerDef({color, id}) {
//     return (
//         <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-down" width="40"
//              height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
//              stroke-linejoin="round">
//             <def>
//                 <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
//                 <line x1="12" y1="5" x2="12" y2="19"></line>
//                 <line x1="16" y1="15" x2="12" y2="19"></line>
//                 <line x1="8" y1="15" x2="12" y2="19"></line>
//                 </def>
//         </svg>
//     )
// }
