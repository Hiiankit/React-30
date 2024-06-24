import React, { useState } from "react";

export default function AgeCalculator() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });
  const [errors, setErrors] = useState({ day: "", month: "", year: "" });

  const isValidDate = (d, m, y) => {
    const isValidDay = d > 0 && d <= 31;
    const isValidMonth = m > 0 && m <= 12;
    const isValidYear = y > 0 && y <= 3000;
    return isValidDay && isValidMonth && isValidYear;
  };

  const calculateAge = () => {
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    // Validate inputs
    if (!isValidDate(dayNum, monthNum, yearNum)) {
      setErrors({
        day: dayNum <= 0 || dayNum > 31 ? "Must be a valid day" : "",
        month: monthNum <= 0 || monthNum > 12 ? "Must be a valid month" : "",
        year: yearNum <= 0 || yearNum > 3000 ? "Must be a valid year" : "",
      });
      return;
    }

    // Clear errors if valid
    setErrors({ day: "", month: "", year: "" });

    const today = new Date();
    const birthDate = new Date(yearNum, monthNum - 1, dayNum); // month is 0-indexed in JavaScript Date

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // Adjust for negative values
    if (ageDays < 0) {
      ageMonths -= 1;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // days in previous month
    }
    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    setAge({
      years: ageYears,
      months: ageMonths,
      days: ageDays,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#f0f0f0]">
      <div className=" w-full max-w-md p-5 rounded-2xl rounded-br-[100px] bg-[#ffffff]">
        <div className="DMY flex gap-x-5  md: static pb-10  ">
          <div className="input-calculator">
            <span
              className={`flex flex-col font-Poppins ${
                errors.day ? "text-red-500" : "text-[#716f6f]"
              }`}
            >
              DAY
            </span>
            <input
              className="border-[#dbdbdb] rounded-md w-[100px]  p-2 border-2 font-Poppins"
              type="number"
              id="day"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <small
              className={`error day ${errors.day ? "text-red-500 flex" : ""}`}
            >
              {errors.day}
            </small>
          </div>

          <div className="input-calculator">
            <span
              className={`flex flex-col font-Poppins ${
                errors.month ? "text-red-500" : "text-[#716f6f]"
              }`}
            >
              MONTH
            </span>
            <input
              className="border-[#dbdbdb] rounded-md w-[100px]  p-2 border-2 font-Poppins"
              type="number"
              id="month"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <small
              className={`error month ${
                errors.month ? "text-red-500 flex" : ""
              }`}
            >
              {errors.month}
            </small>
          </div>

          <div className="input-calculator ">
            <span
              className={`flex flex-col font-Poppins ${
                errors.year ? "text-red-500" : "text-[#716f6f]"
              }`}
            >
              YEAR
            </span>
            <input
              className="border-[#dbdbdb] rounded-md w-[100px]   p-2 border-2 font-Poppins"
              type="number"
              id="year"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <small
              className={`error year ${errors.year ? "text-red-500 flex" : ""}`}
            >
              {errors.year}
            </small>
          </div>
        </div>

        <div className="divider flex  justify-center items-center relative  ">
          <div className="line  w-[450px] bg-[#716f6f] text-[#757171] h-[0.5px]"></div>
          <button className="submit-button text-white rounded-full absolute
                   left-1/2 transform -translate-x-1/2 sm:static sm:transform-none"
            onClick={calculateAge}>
            <img
              className="bg-[#854dff] sm:w-20 rounded-full"
              height={80}
              width={80}
              src="src/icon-arrow.svg"
              alt="Arrow icon"
            />
          </button>
        </div>

        <div className="output ">
          <h1 className="font-Poppins italic pt-5 font-semibold text-[60px]">
            <span className="year  text-[#854dff]">{age.years}</span> years
          </h1>
          <h1 className="font-Poppins italic font-semibold text-[60px]">
            <span className="year  text-[#854dff]">{age.months}</span> months
          </h1>
          <h1 className="font-Poppins italic font-semibold text-[60px]">
            <span className="year  text-[#854dff]">{age.days}</span> days
          </h1>
        </div>
      </div>
    </div>
  );
}
