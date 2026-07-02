import MetricSplit from "../components/MetricSplit";

export default function About() {
  const pillars = [
    {
      title: "Enhancing Public Speaking Skills",
      desc: "We help students discover and refine their inner speaker."
    },
    {
      title: "Shaping Responsible Global Citizens",
      desc: "Our activities prepare students to think critically and act responsibly on global issues."
    },
    {
      title: "Organizing Meaningful Debates",
      desc: "We host debates that tackle real-world issues and relevant resolutions."
    },
    {
      title: "Encouraging Innovation & Idea Sharing",
      desc: "Our community fosters creativity and new perspectives through discussions."
    },
    {
      title: "Preparing for a Fast-Paced World",
      desc: "We equip students with the confidence and skills to succeed in today's dynamic environment."
    },
    {
      title: "Building a Supportive Community",
      desc: "We create a strong network of like-minded individuals who support and inspire each other."
    }
  ];

  return (
    <div className="bg-black text-white selection:bg-express-purple selection:text-white">
      
      <section 
        className="relative h-screen flex flex-col items-center justify-center bg-fixed bg-center bg-cover"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=2070&auto=format&fit=crop)' 
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        
        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <p className="text-express-purple tracking-[0.3em] uppercase text-sm mb-4 font-semibold">
            Official Public Speaking Committee
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-6 tracking-tighter">
            We Are <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-express-purple to-purple-900 outline-text pr-2">
              eXpress
            </span>
          </h1>
          <p className="max-w-2xl text-lg md:text-2xl text-gray-300 font-light leading-relaxed">
            A vibrant community of passionate debaters and public speakers from DJ Sanghvi College of Engineering.
          </p>
        </div>
      </section>

      <div className="bg-black py-12 px-6">
        <MetricSplit />
      </div>

      <section className="relative container mx-auto px-6 py-32">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="lg:w-5/12">
            <div className="sticky top-32">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                Who <span className="text-express-purple">We Are.</span>
              </h2>
              <p className="text-xl text-gray-400 font-light border-l-2 border-express-purple pl-6 mb-8">
                DJS eXpress is the official public speaking committee of DJ Sanghvi College of Engineering. What sets eXpress apart is the consistency and the sheer enthusiasm with which each member works, making us highly coveted.
              </p>
            </div>
          </div>

          <div className="lg:w-7/12 space-y-32 pt-16 lg:pt-0">
            
            <div className="group">
              <h3 className="text-4xl font-bold mb-4 text-white group-hover:text-express-purple transition-colors duration-300">
                Our Reach
              </h3>
              <p className="text-2xl text-gray-300 leading-relaxed font-light">
                We command the largest audiences and highest participant registrations across college events in the city. We have built a reputation for exceptional publicity and unique event concepts that captivate students across the city.
              </p>
            </div>

            <div className="group">
              <h3 className="text-4xl font-bold mb-4 text-white group-hover:text-express-purple transition-colors duration-300">
                Flagship Arenas
              </h3>
              <p className="text-2xl text-gray-300 leading-relaxed font-light">
                We have organised many successful events in the past like <span className="text-white font-medium">Illuminare</span> and our flagship event, <span className="text-white font-medium">Aryavarta</span>, which have been received with a lot of support and appreciation from the students and faculty of the college.
              </p>
            </div>

            <div className="group">
              <h3 className="text-4xl font-bold mb-4 text-white group-hover:text-express-purple transition-colors duration-300">
                Why Choose Us?
              </h3>
              <p className="text-2xl text-gray-300 leading-relaxed font-light">
                Our committee consists of the brightest minds in college, ensuring a platform where only the most thought-provoking discussions and innovative ideas thrive. Our events are designed to challenge, inspire, and refine the skills of participants, ensuring an unparalleled experience.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className=" py-32 border-t border-gray-800">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">What Do We Do?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              We strive to unlock the potential of every student. We organise debates and discussions related to real-world problems and work on finding solutions. We provide an environment for students to grow because the entire process is a learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {pillars.map((pillar, index) => (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-black border border-gray-800 hover:border-express-purple/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(155,135,245,0.1)] flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-full bg-express-purple/10 flex items-center justify-center mb-6 group-hover:bg-express-purple/20 transition-colors">
                  <span className="text-express-purple font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{pillar.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed flex-grow">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}