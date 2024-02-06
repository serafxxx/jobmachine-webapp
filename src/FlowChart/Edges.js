import {getBezierPath} from "reactflow";
import {IconClockHour2} from '@tabler/icons'

export function iconEdge({id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, data, markerEnd,}) {
    const [edgePath, labelX, labelY] = getBezierPath({sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition});
    const foreignObjectSize = 55;
    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={50}
                height={foreignObjectSize}
                x={labelX - foreignObjectSize / 2}
                y={labelY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <div className="d-flex flex-column icon-timer">
                    <div className="justify-content-center"><IconClockHour2/></div>
                    <div className="justify-content-center">Timer</div>
                </div>
            </foreignObject>
            {/*<text>*/}
            {/*    <textPath*/}
            {/*        href={`#${id}`}*/}
            {/*        style={{fontSize: '12px'}}*/}
            {/*        startOffset="50%"*/}
            {/*        textAnchor="middle"*/}
            {/*    >*/}
            {/*        {data.text}*/}
            {/*    </textPath>*/}
            {/*</text>*/}
            {/*<MarkerDefinition/>*/}
        </>
    );
}