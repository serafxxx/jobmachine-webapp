import {Handle, Position} from "reactflow";

export function MyNode({data}) {

    return (
        <>
            {data.label}
            <Handle type="source" id="t1" position={Position.Top} style={{left: 52}}/>
            <Handle type="source" id="t0" position={Position.Top} style={{left: 73}}/>
            <Handle type="source" id="t2" position={Position.Top} style={{left: 94}}/>
            <Handle type="source" id="b1" position={Position.Bottom} style={{left: 52}}/>
            <Handle type="source" id="b0" position={Position.Bottom} style={{left: 73}}/>
            <Handle type="source" id="b2" position={Position.Bottom} style={{left: 94}}/>
            <Handle type="source" id="l1" position={Position.Left} style={{top: 12}}/>
            <Handle type="source" id="l0" position={Position.Left} style={{top: 19}}/>
            <Handle type="source" id="l2" position={Position.Left} style={{top: 26}}/>
            <Handle type="source" id="r1" position={Position.Right} style={{top: 12}}/>
            <Handle type="source" id="r0" position={Position.Right} style={{top: 19}}/>
            <Handle type="source" id="r2" position={Position.Right} style={{top: 26}}/>
            <Handle type="target" id="t1" position={Position.Top} style={{left: 52}}/>
            <Handle type="target" id="t0" position={Position.Top} style={{left: 73}}/>
            <Handle type="target" id="t2" position={Position.Top} style={{left: 94}}/>
            <Handle type="target" id="b1" position={Position.Bottom} style={{left: 52}}/>
            <Handle type="target" id="b0" position={Position.Bottom} style={{left: 73}}/>
            <Handle type="target" id="b2" position={Position.Bottom} style={{left: 94}}/>
            <Handle type="target" id="l1" position={Position.Left} style={{top: 12}}/>
            <Handle type="target" id="l0" position={Position.Left} style={{top: 19}}/>
            <Handle type="target" id="l2" position={Position.Left} style={{top: 26}}/>
            <Handle type="target" id="r1" position={Position.Right} style={{top: 12}}/>
            <Handle type="target" id="r0" position={Position.Right} style={{top: 19}}/>
            <Handle type="target" id="r2" position={Position.Right} style={{top: 26}}/>
       </>
    );
}