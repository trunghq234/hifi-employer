import { Application } from "@/types";
import CandidateCard from "../CandidateCard";

interface IProps {
  candidates: Application[] | undefined;
}

const CandidatesList = (props: IProps) => {
  return (
    <>
      {props.candidates ? (
        props.candidates.map((candidate) => (
          <CandidateCard key={candidate._id} candidate={candidate} />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default CandidatesList;
