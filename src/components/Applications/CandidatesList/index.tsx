import { Application } from "@/types";
import { Empty } from "antd";
import CandidateCard from "../CandidateCard";

interface IProps {
  candidates: Application[] | undefined;
}

const CandidatesList = (props: IProps) => {
  return (
    <>
      {props.candidates?.length ? (
        props.candidates.map((candidate) => (
          <CandidateCard key={candidate._id} candidate={candidate} />
        ))
      ) : (
        <Empty description={"No candidates"} />
      )}
    </>
  );
};

export default CandidatesList;
