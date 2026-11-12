"use client";

export default function About() {
  const historyTimeline = [
    {
      date: "JAN 2016",
      title: "Former Journey",
      desc: "First Logic Meta Lab, formerly known as Infotick Solutions, was established with five members in Perinthalmanna, Kerala, India, providing web designing and development services.",
    },
    {
      date: "MAY 2018",
      title: "From Infotick Solutions to First Logic",
      desc: "Rebranded to First Logic Meta Lab to reflect a commitment to innovation and cutting-edge technologies. The rebranding marked an exciting new chapter in company history.",
    },
    {
      date: "FEB 2019",
      title: "Adapting and Thriving",
      desc: "Workforce grew to 12 employees. During the pandemic lockdown, the team utilized time to master new technologies and implement innovative custom solutions.",
    },
    {
      date: "JUL 2022",
      title: "Private Limited Company",
      desc: "Registered as a Private Limited Company with over 50 employees across various technology departments, delivering quality products across diverse global sectors.",
    },
    {
      date: "FEB 2023",
      title: "Major Growth & Global Reach",
      desc: "Grew to over 200 clients across more than 10 countries, delivering innovative custom solutions with an unyielding focus on excellence and integrity.",
    },
  ];

  const pillars = [
    {
      num: "01",
      title: "Effective Use of Technology",
      desc: "We deliver innovative software solutions that leverage emerging technologies to drive business growth.",
    },
    {
      num: "02",
      title: "Strong and Positive Leadership",
      desc: "Fostering a culture of trust, collaboration, and innovation, driving successful project delivery.",
    },
    {
      num: "03",
      title: "Excellent Customer Service",
      desc: "Exceptional service and continuous support throughout the development process, ensuring customer satisfaction.",
    },
    {
      num: "04",
      title: "Healthy Work Environment",
      desc: "A supportive environment that encourages creativity, technical growth, and work-life balance.",
    },
  ];

  return (
    <section id="about" className="relative z-10 bg-transparent text-white px-6 md:px-12 pt-8 md:pt-12 pb-24 flex flex-col items-center select-none">
      
      {/* 1. Doctrine Editorial Section */}
      <div id="story" className="w-full max-w-5xl mx-auto py-6 sm:py-10 scroll-mt-24 space-y-10">
        
        {/* Main Header with Left & Right Lines */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="flex items-center justify-center space-x-6 w-full max-w-2xl">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-neutral-600 flex-1" />
            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white shrink-0">
              Doctrine
            </h2>
            <div className="h-px bg-gradient-to-l from-transparent via-cyan-500/60 to-neutral-600 flex-1" />
          </div>
          <p className="font-sans text-lg sm:text-xl md:text-2xl font-semibold uppercase tracking-wider text-cyan-400 drop-shadow-[0_0_20px_rgba(56,189,248,0.35)] pt-1">
            OPERATIONAL ANATOMY FIRST. CODE SECOND.
          </p>
        </div>

        {/* 2-Column Distinct Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4">
          
          {/* Left Hero Quote Box (Preserved as requested) */}
          <div className="lg:col-span-5 p-8 bg-neutral-950/80 rounded-2xl border-l-4 border-cyan-400 border-y border-r border-neutral-800 flex flex-col justify-center space-y-4 shadow-xl">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">THE PARADIGM SHIFT</span>
            <blockquote className="font-sans text-lg sm:text-xl text-white font-medium leading-relaxed italic">
              "We do not sell off-the-shelf software. Generic technology forces a business to compromise its unique workflows to fit rigid platform limitations. We reverse that equation."
            </blockquote>
          </div>

          {/* Right Dissection Story Paragraphs (Simple font, no box, no borders) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-neutral-300 font-light text-base sm:text-lg leading-relaxed">
            <p>
              Before a single line of code is written, our system architects surgically dissect the anatomy of your operations. We map every point, node, and feedback loop of your business model. We study the friction. We locate the leakage.
            </p>
            <p>
              Only after achieving absolute comprehension do we engineer a bespoke, high-scale technological backbone. The result is a precise digital ecosystem tailored exclusively to execute your vision and dominate your market.
            </p>
          </div>

        </div>

      </div>

      {/* 2. Why Choose Us (Pillars - Single Sleek Horizontal Row) */}
      <div id="pillars" className="w-full max-w-6xl mx-auto pt-20 pb-16 space-y-10 scroll-mt-24">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">WHY CHOOSE US</span>
          <h3 className="font-sans text-2xl sm:text-3xl font-light text-white">Why We Are Your Best Choice</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {pillars.map((item) => (
            <div 
              key={item.title} 
              className="p-5 bg-gradient-to-b from-neutral-900/60 to-neutral-950/80 rounded-xl border border-neutral-800/60 hover:border-cyan-500/40 transition-all duration-300 relative group shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:shadow-[0_0_8px_#22D3EE] transition-all" />
                <h4 className="font-sans text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {item.title}
                </h4>
                <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. History Chronology Section (Untouched Content) */}
      <div id="history" className="w-full max-w-3xl mx-auto pt-12 pb-16 space-y-10 scroll-mt-24">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">OUR HISTORY</span>
          <h3 className="font-sans text-2xl sm:text-3xl font-light text-white">We Create Dreams For The Future</h3>
        </div>

        <div className="border-l border-neutral-800 pl-8 space-y-10 ml-4">
          {historyTimeline.map((item) => (
            <div key={item.date} className="relative space-y-2">
              <span className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-neutral-700 border border-black" />
              <div className="font-mono text-xs text-neutral-400">{item.date}</div>
              <h4 className="font-sans text-lg font-medium text-white">{item.title}</h4>
              <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
