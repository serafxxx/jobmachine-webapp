import ReactFlow, {ReactFlowProvider, useReactFlow} from 'reactflow';
import 'reactflow/dist/style.css';
import './styles.css'
import {MarkerDefinition} from "./Markers";
import {MyNode} from "./Nodes";
import {useEffect} from "react";


const initialNode = {
    id: 'Initial',
    position: { x: 190, y: 0 },
    data: { label: 'Initial' },
    className: 'flow-node'
};
const workNode = {
    id: 'Work',
    position: { x: 190, y: 110 },
    data: { label: 'Work' },
    className: 'flow-node'
};
const reviewNode = {
    id: 'Review',
    position: { x: 0, y: 220 },
    data: { label: 'Review' },
    className: 'flow-node'
};
const disputeResolutionNode = {
    id: 'DisputeResolution',
    position: { x: 190, y: 220 },
    data: { label: 'Dispute Resolution' },
    className: 'flow-node flow-node-dark'
};
const failNode = {
    id: 'Fail',
    position: { x: 380, y: 220 },
    data: { label: 'Fail' },
    className: 'flow-node flow-node-red'
};
const successNode = {
    id: 'Success',
    position: { x: 0, y: 360 },
    data: { label: 'Success' },
    className: 'flow-node flow-node-green'
};

const nodes = [initialNode, workNode, reviewNode, disputeResolutionNode, failNode, successNode];


const initialWorkEdge = {
    id: 'Initial-Work',
    source: 'Initial',
    target: 'Work',
    sourceHandle: 'b0',
    targetHandle: 't0',
    type: 'step',
    label: 'Owner',
    markerEnd: 'thinMarker',
    className: 'flow-edge'
};

const workReviewEdge = {
    id: 'Work-Review',
    source: 'Work',
    target: 'Review',
    sourceHandle: 'l1',
    targetHandle: 't1',
    type: 'smoothstep',
    label: 'Contractor',
    markerEnd: 'thinMarker-orange',
    className: 'flow-edge flow-edge-orange '
}

const workSuccessEdge = {
    id: 'Work-Success',
    source: 'Work',
    target: 'Success',
    sourceHandle: 'l0',
    targetHandle: 't0',
    type: 'smoothstep',
    label: 'Contractor',
    markerEnd: 'thinMarker-orange',
    className: 'flow-edge flow-edge-orange '
}

const workFailEdge = {
    id: 'Work-Fail',
    source: 'Work',
    target: 'Fail',
    sourceHandle: 'r1',
    targetHandle: 't1',
    type: 'smoothstep',
    label: 'Contractor',
    markerEnd: 'thinMarker-orange',
    className: 'flow-edge flow-edge-orange '
}

const workFailTimerEdge = {
    id: 'Work-Fail-Timer',
    source: 'Work',
    target: 'Fail',
    sourceHandle: 'r1',
    targetHandle: 't2',
    type: 'smoothstep',
    label: 'Deadline',
    markerEnd: 'thinMarker',
    className: 'flow-edge'
}

const reviewWorkEdge = {
    id: 'Review-Work',
    source: 'Review',
    target: 'Work',
    sourceHandle: 't2',
    targetHandle: 'l2',
    type: 'smoothstep',
    label: 'Customer',
    markerEnd: 'thinMarker-green',
    className: 'flow-edge flow-edge-green'
}

const reviewSuccessEdge = {
    id: 'Review-Success',
    source: 'Review',
    target: 'Success',
    sourceHandle: 'b2',
    targetHandle: 't2',
    type: 'smoothstep',
    label: 'Customer',
    markerEnd: 'thinMarker-green',
    className: 'flow-edge flow-edge-green'
}

const reviewSuccessTimerEdge = {
    id: 'Review-Success-Timer',
    source: 'Review',
    target: 'Success',
    sourceHandle: 'b1',
    targetHandle: 't1',
    type: 'smoothstep',
    label: 'Timer',
    markerEnd: 'thinMarker',
    className: 'flow-edge'
}

const workDisputeResolutionEdge = {
    id: 'Work-DisputeResolution',
    source: 'Work',
    target: 'DisputeResolution',
    sourceHandle: 'b0',
    targetHandle: 't0',
    type: 'smoothstep',
    label: 'Contractor',
    markerEnd: 'thinMarker-orange',
    className: 'flow-edge flow-edge-orange flow-edge-dashed'
}

const disputeResolutionSuccessSystemEdge = {
    id: 'DisputeResolution-Success-System',
    source: 'DisputeResolution',
    target: 'Success',
    sourceHandle: 'b0',
    targetHandle: 'r0',
    type: 'smoothstep',
    label: 'System',
    markerEnd: 'thinMarker',
    className: 'flow-edge'
}

const edges = [initialWorkEdge, workReviewEdge, workSuccessEdge, workFailEdge, workFailTimerEdge, reviewWorkEdge,
    reviewSuccessEdge, reviewSuccessTimerEdge, workDisputeResolutionEdge, disputeResolutionSuccessSystemEdge];

const nodeTypes = { 'default': MyNode };

function enableReview(reviewEnabled){
    if(reviewEnabled){
        reviewNode.hidden = false;
        workReviewEdge.hidden = false;
        reviewWorkEdge.hidden = false;
        reviewSuccessEdge.hidden = false;
        reviewSuccessTimerEdge.hidden = false;
        workSuccessEdge.hidden = true;
    }else{
        reviewNode.hidden = true;
        workReviewEdge.hidden = true;
        reviewWorkEdge.hidden = true;
        reviewSuccessEdge.hidden = true;
        reviewSuccessTimerEdge.hidden = true;
        workSuccessEdge.hidden = false;
    }
}

function enableDisputeResolution(disputeResolutionEnabled){
    if(disputeResolutionEnabled){
        disputeResolutionNode.hidden = false;
        workDisputeResolutionEdge.hidden = false;
        disputeResolutionSuccessSystemEdge.hidden = false;
    }else{
        disputeResolutionNode.hidden = true;
        workDisputeResolutionEdge.hidden = true;
        disputeResolutionSuccessSystemEdge.hidden = true;
    }
}

function enableDeadline(deadlineEnabled){
    if(deadlineEnabled){
        workFailTimerEdge.hidden = false;
        workFailEdge.sourceHandle = 'r2';
        workFailEdge.targetHandle = 't1';
    }else{
        workFailTimerEdge.hidden = true;
        workFailEdge.sourceHandle = 'r0';
        workFailEdge.targetHandle = 't0';
    }
}

function Flow({deadlineEnabled, reviewEnabled, disputeResolutionEnabled}) {
    const rf = useReactFlow();
    useEffect(() => {
        const onResize = () => {
            rf.fitView();
        }

        enableReview(reviewEnabled);
        enableDisputeResolution(disputeResolutionEnabled);
        enableDeadline(deadlineEnabled);
        rf.setNodes(nodes);
        rf.setEdges(edges);
        rf.fitView();

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        }
    });


    const nodeClickHandler = (e, node)=>{
        alert(node);
    };
    return (
        <div style={{ height: '400px', width:'100%' }} className="mt-3 mb-3">
            <ReactFlow defaultNodes={nodes} defaultEdges={edges} nodeTypes={nodeTypes}
               fitView proOptions={{ hideAttribution: true }}
               nodesDraggable={false} nodesConnectable={false} panOnDrag={false} panOnScroll={false}
               zoomOnScroll={false} zoomOnPinch={false} zoomOnDoubleClick={false}
               disableKeyboardA11y={true} preventScrolling={false}
               onNodeClick={nodeClickHandler}
            />
            <MarkerDefinition id="thinMarker" color="#e6e7e9"/>
            <MarkerDefinition id="thinMarker-orange" color="#F76707FF"/>
            <MarkerDefinition id="thinMarker-green" color="#2FB344FF"/>
        </div>
    );
}

function FlowWithProvider(props){
    return (
        <ReactFlowProvider>
            <Flow {...props}/>
        </ReactFlowProvider>
    )
}


export default FlowWithProvider;