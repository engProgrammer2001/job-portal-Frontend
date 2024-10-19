import React from "react";

const testimonials = [
  {
    name: "Subham Kumar",
    image:
      "https://notionpress.com/authorpics/1673328977-817405author-photo.png", 
    message: "This job portal helped me land my dream job. Highly recommend it!",
  },
  {
    name: "Neha Sharma",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLfc97RCCvT66AMYmEgZ-8MQQixd7-89O3iA&s", 
    message: "The application process was smooth and the platform is user-friendly.",
  },
  {
    name: "Ravi Gupta",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQH3F0BilPoUCQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1682425824140?e=2147483647&v=beta&t=Ihbsm8a0trks7ofont6cllEQAgWC9y5f68rWoKr80_A", 
    message: "I found multiple opportunities and finally got hired. Great experience!",
  },
  {
    name: "Sneha Gautam",
    image:
      "https://static.spotboye.com/uploads/Neha_2021-10-27-3-39-52_thumbnail.jpg",
    message: "I was struggling to find the right job that matched my qualifications, but this job portal made the process so much easier. The platform is incredibly user-friendly, with powerful filters that helped me narrow down jobs that fit my specific criteria.",
  },
  {
    name: "Abhi Singh",
    image:
      "https://pbs.twimg.com/profile_images/1517155175064027136/ze_ng_XI_400x400.jpg", 
    message: "This job portal is an absolute game-changer. Not only is it easy to use, but the variety of job listings available is remarkable.",
  },
  {
    name: "Rubina Khan",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPxcn9Y36PjdkvbWWz3wq77Nq4ASsbxI1wIg&s",
    message: "I’ve used many job search websites in the past, but none compare to the experience I had with this job portal. The job matching system is incredibly accurate, and I loved how easy it was to apply for multiple positions with just a few clicks.",
  },
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      <img
        src={testimonial.image}
        alt={`${testimonial.name}'s testimonial`}
        className="w-24 h-24 mx-auto rounded-full border-4 border-gray-300"
      />
      <div className="text-center mt-4">
        <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
        <p className="mt-2 text-gray-600 italic">{testimonial.message}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="py-12 bg-gray-100">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
