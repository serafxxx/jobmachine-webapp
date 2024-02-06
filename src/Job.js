import Flow from "./FlowChart/Flow";
import {useState} from "react";
import {IconCertificate, IconSearch, IconCurrencyEthereum, IconAlarm} from '@tabler/icons'

export function JobForm(){
    const[deadlineEnabled, setDeadlineEnabled] = useState(false);
    const[reviewEnabled, setReviewEnabled] = useState(true);
    const[disputeResolutionEnabled, setDisputeResolutionEnabled] = useState(false);
    return (
        <div className="card">
            <form>
                <div className="card-body">
                    <JobFormInternal
                        deadlineEnabled={deadlineEnabled} setDeadlineEnabled={setDeadlineEnabled}
                        reviewEnabled={reviewEnabled} setReviewEnabled={setReviewEnabled}
                        disputeResolutionEnabled={disputeResolutionEnabled} setDisputeResolutionEnabled={setDisputeResolutionEnabled}
                    />
                    <Flow
                        deadlineEnabled={deadlineEnabled} reviewEnabled={reviewEnabled}
                        disputeResolutionEnabled={disputeResolutionEnabled}
                    />
                </div>
            </form>
            <div className="card-footer text-end">
                <div className="d-flex">
                    <button type="submit" className="btn btn-primary ms-auto"><IconCertificate/>Mint Job</button>
                </div>
            </div>
        </div>
    )
}

function JobFormInternal({deadlineEnabled, setDeadlineEnabled, reviewEnabled, setReviewEnabled, disputeResolutionEnabled, setDisputeResolutionEnabled}){
    const[description, setDescription] = useState("");
    const[skills, setSkills] = useState([]);
    const[reward, setReward] = useState(0);
    const[deadline, setDeadline] = useState(0);
    const[deadlineFine, setDeadlineFine] = useState(0);
    const[reviewDeadline, setReviewDeadline] = useState(4320);


    return(
        <>
            <JobDescription
                description={description} setDescription={setDescription}/>
            <JobSkills/>
            <JobReward/>
            <JobDeadline
                deadlineEnabled={deadlineEnabled} setDeadlineEnabled={setDeadlineEnabled}
                deadline={deadline} setDeadline={setDeadline} deadlineFine={deadlineFine}
                setDeadlineFine={setDeadlineFine}
            />
            <JobReview
                reviewEnabled={reviewEnabled} setReviewEnabled={setReviewEnabled}
                reviewDeadline={reviewDeadline} setReviewDeadline={setReviewDeadline}
                setDisputeResolutionEnabled={setDisputeResolutionEnabled}
            />
            <JobDisputeResolution
                reviewEnabled={reviewEnabled}
                disputeResolutionEnabled={disputeResolutionEnabled} setDisputeResolutionEnabled={setDisputeResolutionEnabled}/>
        </>
    )
}

function JobDescription({description, setDescription}){
    return (
        <div className="form-group mb-3 ">
            <label className="form-label required">The Task</label>
            <div>
                <textarea className="form-control" placeholder="What needs to be done.." rows={4} onChange={(e)=>setDescription(e.target.value)} value={description}/>
                <small className="form-hint">
                    Describe what needs to be done. Pay attention, be specific, brake big task into multiple small.
                    Its important to define task carefully. Task would be frozen when contract starts. Avoid exteral links.
                </small>
            </div>
        </div>
    )
}

function JobSkills(){
    const [more, setMore] = useState(false);
    return (
        <div className="form-group mb-3 ">
            <label className="form-label">Skills</label>
            <div className="row">
                <div className="input-icon mb-2 col-md-4">
                    <input type="text" className="form-control" placeholder="Search..."/>
                    <span className="input-icon-addon">
                        <IconSearch/>
                    </span>
                </div>
            </div>
            <div className="mt-2 mb-3">
                <span className="badge bg-azure-lt me-3">Python</span>
                <span className="badge bg-azure-lt me-3">React</span>
                <a href="#" className="badge bg-azure-lt">Blue</a>
            </div>
            {
                more? (
                    <small className="form-hint">
                        <div>A list of skills or other aspects of contractor needed to perform the task (like expertise in some area, his location, equipment, opportunity to do something etc.).</div>
                        <div>For each ability you could set <b>weight</b> and required <b>experience</b>.</div>
                        <div>
                            Weight is needed to better describe job and give right experience score credit to
                            the contractor. Its a percent which shows the involvement of the skill in getting
                            job done. It will make sence to set weight of Python ability to 100% for Pure Python job.
                            Weight will influence contractor’s experience score if contract finished successfully.
                        </div>
                        <div>
                            Contractors <b>Validated Experience Score</b> counted from past successful contracts: (reward * weight) / 100.
                            For example, job with Python 50% ability and reward 2eth will add 1eth validated Python experience to contractor’s history.
                        </div>
                        <div>Goals:</div>
                        <ul>
                            <li>Better describe the task by adding abilities</li>
                            <li>Filter out less experienced contractors by marking some abilities neccessary</li>
                            <li>The history of successfully finished tasks would be reflected in Contractors Verified Experience (ability weight times contract reward)</li>
                        </ul>
                        <a href="#" onClick={()=>setMore(false)}>less</a>
                    </small>
                ):(
                    <small className="form-hint">
                        A list of skills or other aspects of contractor needed to perform the task. <a href="#" onClick={()=>setMore(true)}>more</a>
                    </small>
                )
            }
        </div>
    )
}

function JobReward(){
    return (
        <div className="form-group mb-3 ">
            <label className="form-label required">Reward</label>
            <div className="row">
                <div className="input-icon mb-2 col-md-4">
                    <span className="input-icon-addon">
                        <IconCurrencyEthereum/>
                    </span>
                    <input type="text" className="form-control col-md-3" placeholder="0.00"/>
                </div>
            </div>
            <small>
                To be frozen inside contract before start. In case of successful contract execution:
                transfer to the conractor. In case of fail: transfer back to customer
            </small>

        </div>
    )
}

function JobDeadline({deadlineEnabled, setDeadlineEnabled, deadline, setDeadline, deadlineFine, setDeadlineFine}){
    return (
        <>
            <div className="form-group mb-3">
                <label className="form-label form-check form-switch mb-1">
                    <input className="form-check-input" type="checkbox" checked={deadlineEnabled} onChange={()=>setDeadlineEnabled(!deadlineEnabled)}/>
                    <span className="form-check-label">Deadline and Fine</span>
                </label>
                <small>Motivate Contractor to finish task in time</small>
            </div>
            { deadlineEnabled ?
                <>
                    <div className="form-group mb-3">
                        <label className="form-label">Deadline</label>
                        <div className="input-icon mb-2 col-md-4">
                            <span className="input-icon-addon">
                                <IconAlarm/>
                            </span>
                            <input type="text" className="form-control col-md-3" placeholder="0"/>
                        </div>
                        <small>
                            Minutes allowed to work on the task. Counts while contract is in Working state.
                        </small>
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Deadline Fine</label>
                        <div className="input-icon mb-2 col-md-4">
                            <span className="input-icon-addon">
                                <IconCurrencyEthereum/>
                            </span>
                            <input type="text" className="form-control col-md-3" placeholder="0.00"/>
                        </div>

                        <small>
                            To be frozen by Contractor as guarantee. Fine would be returned back to Contractor in case of job success or transferred to Customer in case of failed deadline.
                        </small>
                    </div>
                </>
                : <></>
            }
        </>
    )
}

function JobReview({reviewEnabled, setReviewEnabled, reviewDeadline, setReviewDeadline, setDisputeResolutionEnabled}){

    const handleReviewEnabledChange = () => {
        if(reviewEnabled){
            setDisputeResolutionEnabled(!reviewEnabled);
        }
        setReviewEnabled(!reviewEnabled);
    }

    const handleReviewDeadlineChange = (e) => {
        let v = parseInt(e.target.value);
        if(Number.isInteger(v) && v >= 0){
            setReviewDeadline(v);
        }
    };

    return (
        <>
            <div className="form-group mb-3 ">
                <label className="form-label form-check form-switch">
                    <input className="form-check-input" type="checkbox" checked={reviewEnabled} onChange={handleReviewEnabledChange}/>
                    <span className="form-check-label">Customer Review</span>
                </label>
                <small>
                    You could allow Contractor to successfully and unconditionally finish contract without review. Use it if you’re asking someone’s opinion via the contract or if you’re working with
                    trusted contractor.
                </small>
            </div>
            { reviewEnabled ?
                <>
                    <div className="form-group mb-3">
                        <label className="form-label">Review Deadline</label>
                        <div className="input-icon mb-2 col-md-4">
                            <span className="input-icon-addon">
                                <IconAlarm/>
                            </span>
                            <input type="text" value={reviewDeadline} onChange={handleReviewDeadlineChange} className="form-control col-md-3" placeholder="0"/>
                        </div>
                        <small>
                            Minutes allowed for the review. To guarantee that review will be finished sooner or later.
                        </small>
                    </div>
                </>
                : <></>
            }
        </>
    )
}

function JobDisputeResolution({reviewEnabled, disputeResolutionEnabled, setDisputeResolutionEnabled}){
    return (
        <div className="form-group mb-3 ">
            <label className="form-label form-check form-switch">
                <input className="form-check-input" type="checkbox" disabled={!reviewEnabled} checked={disputeResolutionEnabled} onChange={()=>setDisputeResolutionEnabled(!disputeResolutionEnabled)}/>
                <span className="form-check-label">Dispute Resolution</span>
            </label>
            <small>
                Dispute resolution is a reserve way for Contractor to move job to Success.
            </small>
        </div>
    )
}