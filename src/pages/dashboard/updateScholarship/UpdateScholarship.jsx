import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

import LogoLoader from "../../../components/LogoLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import imagekitUploader from "../../../utils/imagekitUploader";

const UpdateScholarship = () => {
  const [progress, setProgress] = useState(0);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const countriesCities = useLoaderData();
  const { register, handleSubmit, control, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  // REACT QUERY CALL
  const {
    refetch,
    data: scholarship = {},
    isLoading,
  } = useQuery({
    queryKey: ["scholarships", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });
  const {
    _id,
    scholarshipName,
    scholarshipCategory,
    scholarshipPostDate,
    degree,
    applicationFees,
    applicationDeadline,
    subjectCategory,
    tuitionFees,
    universityName,
    universityCountry,
    universityCity,
    universityWorldRank,
    serviceCharge,
  } = scholarship;
  console.log(scholarship);
  const compareAblefields = {
    scholarshipName,
    scholarshipCategory,
    scholarshipPostDate,
    degree,
    applicationFees,
    applicationDeadline,
    subjectCategory,
    tuitionFees,
    universityName,
    universityCountry,
    universityCity,
    universityWorldRank,
    serviceCharge,
  };

  const countries = countriesCities.map((c) => c.country);
  const selectedUniversityCountry = useWatch({
    control,
    name: "universityCountry",
  });
  const selectedScholarshipCategory = useWatch({
    control,
    name: "scholarshipCategory",
  });

  const citiesByCountry = (country) => {
    const cities = countriesCities.find((item) => item.country === country);

    return cities ? cities.cities : [];
  };
  // ____________________________________________________
  //  Handle Update function
  //  ____________________________________________________

  const handleUpdateScholarship = async (data) => {
    const changedFields = {};

    // 1. we make copy of old product data (excluding imageUrl)
    const compareData = { ...compareAblefields };
    // 2. Compare all fields except imageUrl
    for (const key in compareData) {
      const oldValue = compareData[key];
      const newValue = data[key];

      // 3.  Normalize numbers because React Hook Form returns them as strings so we have to make it number
      const normalizedOld =
        typeof oldValue === "number" ? Number(oldValue) : oldValue;
      const normalizedNew =
        typeof newValue === "number" ? Number(newValue) : newValue;
      //4.  If value changed then add to changedFields
      if (normalizedOld !== normalizedNew) {
        changedFields[key] = newValue;
      }
    }

    // ---------------------------------------------------------
    //  5. Handle Image Upload (only if user selected a new file)
    // ---------------------------------------------------------
    let uploadedImageURL = null;
    setLoading(true);

    if (data.imageUrl && data.imageUrl.length > 0) {
      try {
        //6.  Upload image to ImageKit and get the img ulr
        uploadedImageURL = await imagekitUploader(data.imageUrl[0], (event) => {
          setProgress((event.loaded / event.total) * 100);
        });

        //7.  If upload successful then add this url to changed fields
        changedFields.imageUrl = uploadedImageURL;
      } catch (error) {
        console.error("Image upload failed:", error.message);
        return;
      }
    }
    // ---------------------------------------------------------
    //  8. If no fields were changed Then show warning and return and stop here
    // ---------------------------------------------------------
    if (Object.keys(changedFields).length === 0) {
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: `Change fields to update`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    console.log("Updating fields:", changedFields);

    // ---------------------------------------------------------
    //  9. Send update request
    // ---------------------------------------------------------
    try {
      await axiosSecure
        .patch(`/scholarships/${id}`, changedFields)
        .then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Scholarship Updated`,
              showConfirmButton: false,
              timer: 2000,
            });
            setLoading(false);
          }
        });

      //10. back to scholarship management page
      navigate("/dashboard/scholarship-management");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (scholarship && scholarship._id) {
      reset({
        scholarshipName: scholarship.scholarshipName,
        scholarshipCategory: scholarship.scholarshipCategory,
        scholarshipPostDate: scholarship.scholarshipPostDate,
        degree: scholarship.degree,
        applicationFees: scholarship.applicationFees,
        applicationDeadline: scholarship.applicationDeadline,
        subjectCategory: scholarship.subjectCategory,
        tuitionFees: scholarship.tuitionFees,
        universityName: scholarship.universityName,
        universityCountry: scholarship.universityCountry,
        universityCity: scholarship.universityCity,
        universityWorldRank: scholarship.universityWorldRank,
        serviceCharge: scholarship.serviceCharge,
        imageUrl: "",
      });
    }
  }, [scholarship, reset]);

  if (loading || isLoading) {
    return <LogoLoader></LogoLoader>;
  }
  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-2">
      <div className="w-full max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center">Update Scholarship</h2>
        <form
          onSubmit={handleSubmit(handleUpdateScholarship)}
          className="mt-6 p-4"
        >
          <h3 className="font-semibold text-gray-700">Scholarship details</h3>
          <hr className="border-0 h-px bg-gray-200 my-2" />
          <div className="grid grid-cols-1 md:grid-cols-2">
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
                className="select outline-0 "
              >
                <option value="">Select Category</option>
                <option value="Full fund">Full fund</option>
                <option value="Partial">Partial</option>
                <option value="Self fund">Self fund</option>
              </select>
            </fieldset>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* 3. Degree */}
            <fieldset className="fieldset">
              <label className="label">Degree</label>
              <select
                {...register("degree", {
                  required: "Degree is required",
                })}
                className="select outline-0"
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
            <fieldset className="fieldset">
              <label className="label">Subject Category</label>
              <select
                {...register("subjectCategory", {
                  required: "Category is required",
                })}
                className="select outline-0 "
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
          <h3 className="font-semibold text-gray-700 pt-2">
            University details
          </h3>
          <hr className="border-0 h-px bg-gray-200 my-2" />
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
              <select {...register("universityCountry")} className="select">
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
              <select {...register("universityCity")} className="select">
                <option value={""}>Select City</option>
                {citiesByCountry(selectedUniversityCountry).map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
          <h3 className="font-semibold text-gray-700 pt-2">Others details</h3>
          <hr className="border-0 h-px bg-gray-200 my-2" />
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
                readOnly={
                  selectedScholarshipCategory === "Full fund" ? true : false
                }
                defaultValue={
                  selectedScholarshipCategory === "Full fund" ? 0 : ""
                }
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
            value={"Update Scholarship"}
            className="btn bg-teal-600 text-white mt-4 "
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateScholarship;
