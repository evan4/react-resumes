import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export default function JobList({ jobItems, isLoading }) {
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.length &&
        jobItems.map((jobItem) => (
          <JobListItem jobItem={jobItem} key={jobItem.id} />
        ))}
    </ul>
  );
}
