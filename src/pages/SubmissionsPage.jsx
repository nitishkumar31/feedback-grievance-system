import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormDetails from "../components/FormDetails";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmissions, setSelectedSubmissions] = useState([]);
  const [showFormDetails, setShowFormDetails] = useState(false);
  const [formDetails, setFormDetails] = useState({});

  useEffect(() => {
    const storedSubmissions =
      JSON.parse(localStorage.getItem("feedback")) || [];
    setSubmissions(storedSubmissions);
  }, []);

  const handleSelectSubmission = (index) => {
    if (selectedSubmissions.includes(index)) {
      setSelectedSubmissions(selectedSubmissions.filter((i) => i !== index));
    } else {
      setSelectedSubmissions([...selectedSubmissions, index]);
    }
  };

  const handleDeleteSelected = () => {
    const newSubmissions = submissions.filter(
      (_, index) => !selectedSubmissions.includes(index)
    );
    setSubmissions(newSubmissions);
    localStorage.setItem("feedback", JSON.stringify(newSubmissions));
    setSelectedSubmissions([]);
  };

  const handleFormDetailsButton = (submissionData) => {
    setFormDetails(submissionData);
    setShowFormDetails(true);
  };

  return (
    <div className="mx-auto pt-8 px-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Submissions</h1>
      {submissions.length > 0 ? (
        <>
          <div className="flex justify-between px-4">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 cursor-pointer mb-4"
              onClick={handleDeleteSelected}
              disabled={selectedSubmissions.length === 0}
            >
              Delete Selected
            </button>
            <Link
              to="/"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 h-10 px-4 rounded w-fit"
            >
              Add New
            </Link>
          </div>

          <div className="table-container overflow-auto">
            <div className="submission-tablew-[90vw] h-[calc(100vh-160px)]">
              <table className="relative w-full mx-auto bg-white border">
                <thead className="sticky top-[-1px] bg-purple-100">
                  <tr>
                    <th
                      title="Select All"
                      className="py-3 px-4 border border-slate-300 whitespace-nowrap text-center"
                    >
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSubmissions(
                              submissions.map((_, index) => index)
                            );
                          } else {
                            setSelectedSubmissions([]);
                          }
                        }}
                        className="accent-purple-500"
                      />
                    </th>
                    <th className="py-3 px-4 border border-slate-300 whitespace-nowrap text-center">
                      Form Details
                    </th>
                    <th className="py-3 px-4 border border-slate-300 whitespace-nowrap text-center">
                      Customer Name
                    </th>
                    <th className="py-3 px-4 border border-slate-300 whitespace-nowrap text-center">
                      Email
                    </th>
                    <th className="py-3 px-4 border border-slate-300 whitespace-nowrap text-center">
                      Phone
                    </th>
                    <th className="py-3 px-4 border border-slate-300 whitespace-nowrap text-center">
                      Please rate the quality of the service you received from
                      your host.
                    </th>
                    <th className="py-3 px-4 border border-slate-300 whitespace-nowrap text-center">
                      Please rate the quality of your beverage.
                    </th>
                    <th className="py-3 px-4 border border-slate-300 whitespace-nowrap text-center">
                      Was our restaurant clean?
                    </th>
                    <th className="py-3 px-4 border border-slate-300 whitespace-nowrap text-center">
                      Please rate your overall dining experience.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => (
                    <tr key={index}>
                      <td className="py-2 border border-slate-300 text-center">
                        <input
                          title="Select"
                          className="accent-purple-500"
                          type="checkbox"
                          checked={selectedSubmissions.includes(index)}
                          onChange={() => handleSelectSubmission(index)}
                        />
                      </td>
                      <td className="py-2 px-4 border border-slate-300 text-center">
                        <button
                          onClick={() => handleFormDetailsButton(submission)}
                          className="text-blue-500 hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                      <td className="py-2 px-4 border border-slate-300 text-center">
                        {submission.customerName}
                      </td>
                      <td className="py-2 px-4 border border-slate-300 text-center">
                        {submission.email}
                      </td>
                      <td className="py-2 px-4 border border-slate-300 text-center">
                        {submission.phone}
                      </td>
                      <td className="py-2 px-4 border border-slate-300 text-center">
                        {submission.serviceQuality}
                      </td>
                      <td className="py-2 px-4 border border-slate-300 text-center">
                        {submission.beverageQuality}
                      </td>
                      <td className="py-2 px-4 border border-slate-300 text-center">
                        {submission.cleanliness}
                      </td>
                      <td className="py-2 px-4 border border-slate-300 text-center">
                        {submission.overallExperience}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <FormDetails
            submission={formDetails}
            showFormDetails={showFormDetails}
            setShowFormDetails={setShowFormDetails}
          />
        </>
      ) : (
        <div className="flex flex-col gap-6">
          <p>No submissions found</p>
          <Link
            to="/"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 h-10 px-4 mx-auto rounded w-fit"
          >
            Add New
          </Link>
        </div>
      )}
    </div>
  );
};

export default Submissions;
