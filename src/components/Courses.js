import React from "react";

const courses = [
  { title: "Anatomy Basics", desc: "Learn the fundamentals of human anatomy.", img: "https://img.freepik.com/free-photo/anatomy-concept_23-2148165520.jpg" },
  { title: "Pharmacology 101", desc: "Understand how drugs interact in the human body.", img: "https://img.freepik.com/free-photo/laboratory-medicine_23-2148165429.jpg" },
  { title: "Clinical Pathology", desc: "Deep dive into diagnostic and lab analysis techniques.", img: "https://img.freepik.com/free-photo/pathologist-analyzing-sample_23-2148165401.jpg" },
];

const Courses = () => {
  return (
    <section id="courses" className="py-20 bg-blue-50 text-center" data-aos="fade-up">
      <h2 className="text-4xl font-bold text-blue-600 mb-10">Our Courses</h2>
      <div className="flex flex-wrap justify-center gap-10 px-6">
        {courses.map((course, i) => (
          <div
            key={i}
            data-aos="zoom-in"
            className="bg-white shadow-lg rounded-2xl w-80 p-4 hover:scale-105 transition-transform border border-blue-100"
          >
            <img src={course.img} alt={course.title} className="rounded-xl h-48 w-full object-cover mb-4" />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{course.title}</h3>
            <p className="text-gray-600">{course.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
