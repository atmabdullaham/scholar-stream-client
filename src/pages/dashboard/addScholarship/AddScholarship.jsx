import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import imagekitUploader from "../../../utils/imagekitUploader";

const AddScholarship = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const countriesCities = useLoaderData();
  const { register, handleSubmit, control } = useForm();
  const axiosSecure = useAxiosSecure();

  const countries = countriesCities.map((c) => c.country);
  const universityCountry = useWatch({ control, name: "universityCountry" });
  const scholarshipCategory = useWatch({
    control,
    name: "scholarshipCategory",
  });

  const citiesByCountry = (country) => {
    const cities = countriesCities.find((item) => item.country === country);

    return cities ? cities.cities : [];
  };

  const handleAddScholarship = async (data) => {
    const file = data.imageUrl[0];

    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      const url = await imagekitUploader(file, (event) => {
        setProgress((event.loaded / event.total) * 100);
      });
      data.imageUrl = url;
    } catch (error) {
      console.error(error.message);
    }
    try {
      setLoading(true);
      data.postedUserEmail = user.email;
      console.log(data);
      axiosSecure.post("/scholarships", data).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Scholarship added successfully`,
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("");
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div class="flex gap-2">
        <span class="size-3 animate-ping rounded-full bg-indigo-600"></span>
        <span class="size-3 animate-ping rounded-full bg-indigo-600 [animation-delay:0.2s]"></span>
        <span class="size-3 animate-ping rounded-full bg-indigo-600 [animation-delay:0.4s]"></span>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-2">
      <div className="w-full max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center">Add Scholarship</h2>
        <form
          onSubmit={handleSubmit(handleAddScholarship)}
          className="mt-6 p-4"
        >
          <h3>Scholarship details</h3>
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Scholarship Name */}
            <fieldset className="fieldset">
              <label className="label">Scholarship Name</label>
              <input
                type="text"
                {...register("scholarshipName")}
                className="input w-full outline-0"
                placeholder="Scholarship Name"
              />
            </fieldset>
            {/* 2. Scholarship Category */}
            <fieldset className="fieldset">
              <label className="label">Scholarship Category</label>
              <select
                {...register("scholarshipCategory", {
                  required: "Category is required",
                })}
                className="select outline-0 w-full"
              >
                <option value="">Select Category</option>
                <option value="Full fund">Full fund</option>
                <option value="Partial">Partial</option>
                <option value="Self fund">Self fund</option>
              </select>
            </fieldset>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 3. Degree */}
            <fieldset className="fieldset">
              <label className="label">Degree</label>
              <select
                {...register("degree", {
                  required: "Degree is required",
                })}
                className="select outline-0 w-full"
              >
                <option value="">Select Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
                <option value="Post Doctoral">Post Doctoral</option>
              </select>
            </fieldset>
            {/* 4. Subject Category */}
            <fieldset className="fieldset ">
              <label className="label">Subject Category</label>
              <select
                {...register("subjectCategory", {
                  required: "Category is required",
                })}
                className="select outline-0  w-full"
              >
                <option value="">Select Subject Category</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
                <option value="Medicine">Medicine</option>
                <option value="Social Science">Social Science</option>
                <option value="Arts & Humanities">Arts & Humanities</option>
                <option value="Law">Law</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Biology">Chemistry</option>
              </select>
            </fieldset>
          </div>
          <h3>University details</h3>
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 5. University Name */}
            <fieldset className="fieldset">
              <label className="label">University Name</label>
              <input
                type="text"
                {...register("universityName")}
                className="input w-full outline-0"
                placeholder="University Name"
              />
            </fieldset>
            {/* 6. University World Rank */}
            <fieldset className="fieldset">
              <label className="label">University World Rank</label>
              <input
                type="number"
                {...register("universityWorldRank", {
                  valueAsNumber: true,
                  required: "This is required",
                })}
                className="input w-full outline-0"
                placeholder="University World Rank"
              />
            </fieldset>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/*7. Image */}
            <fieldset className="fieldset">
              <label className="label">Image</label>
              <input
                {...register("imageUrl")}
                type="file"
                className="file-input w-full "
              />
            </fieldset>
            <fieldset>
              <label className="label">Upload progress:</label>
              <progress
                className="w-full"
                value={progress}
                max={100}
              ></progress>
            </fieldset>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/*8.  University Country */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Country</legend>
              <select
                {...register("universityCountry")}
                className="select w-full"
              >
                <option value={""}>Select Country</option>
                {countries.map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {/*9.  University City */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">City</legend>
              <select {...register("universityCity")} className="select w-full">
                <option value={""}>Select City</option>
                {citiesByCountry(universityCountry).map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
          <h3>Others details</h3>
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 10.Tution Fees*/}
            <fieldset className="fieldset">
              <label className="label">Tution Fees</label>
              <input
                type="number"
                {...register("tuitionFees", {
                  valueAsNumber: true,
                })}
                className="input w-full outline-0"
                readOnly={scholarshipCategory === "Full fund" ? true : false}
                defaultValue={scholarshipCategory === "Full fund" ? 0 : ""}
                placeholder="Tution Fees"
              />
            </fieldset>
            {/* 11. Application Deadline */}
            <fieldset className="fieldset">
              <label className="label">Application Deadline</label>
              <input
                type="datetime-local"
                {...register("applicationDeadline")}
                className="input w-full outline-0"
              />
            </fieldset>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 13.Application Fees*/}
            <fieldset className="fieldset">
              <label className="label">Application Fees</label>
              <input
                type="number"
                {...register("applicationFees", {
                  valueAsNumber: true,
                  required: "This is required",
                })}
                className="input w-full outline-0"
                placeholder="Application Fees"
              />
            </fieldset>
            {/* 14. Service Charge */}
            <fieldset className="fieldset">
              <label className="label">Service Charge</label>
              <input
                type="number"
                {...register("serviceCharge", {
                  valueAsNumber: true,
                  required: "This is required",
                })}
                className="input w-full outline-0"
                placeholder="Service Charge"
              />
            </fieldset>
          </div>

          <input
            type="submit"
            value={"Add Scholarship"}
            className="btn bg-teal-600 text-white mt-4 "
          />
        </form>
      </div>
    </div>
  );
};

export default AddScholarship;
