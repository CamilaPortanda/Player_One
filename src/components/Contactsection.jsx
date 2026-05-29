import { useRef, useState, useEffect } from 'react'
import rockwellBuilding from '../assets/industryBuilding.png'
import gameCharacter from '../assets/swippy.png'
import mountainBg from '../assets/product3.png'
import rockwellLogo from '../assets/rockwell_automation_logo.png'
import tecLogo from '../assets/tecLogo.png'
import myIcon from '../assets/icono_colab.png'
import customBanner from '../assets/customBanner.png'
import PlayerOneLogo from '../assets/icono_p1.png'
import romboRockwell from '../assets/Rombo_Rockwell.png'
import urlIcon from '../assets/urlIcon.png'
import cyberIcon from '../assets/cyberIcon.png'
import contactIcon from '../assets/contactIcon.png'

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

const RockwellLink = ({ icon, label, desc, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className="flex items-center justify-between py-3 border-b border-gray-100 hover:text-[#9B0032] transition-colors group">
    <div className="flex items-center gap-3">
      <span className="text-[#9B0032]">{icon}</span>
      <div>
        <p className="text-md font-semibold text-[#003e7e] group-hover:text-[#9B0032]">{label}</p>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    </div>
    <span className="text-gray-400 group-hover:text-[#9B0032] text-lg">→</span>
  </a>
)

const SocialLink = ({ icon, label, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-[#9B0032] hover:text-[#9B0032] transition-colors">
    <span>{icon}</span>
    <span className="font-medium">{label}</span>
  </a>
)

export default function ContactSection() {
  const [leftRef, leftInView] = useInView()
  const [rightRef, rightInView] = useInView()

  return (
    <section id="contact" className="px-6 md:px-16 py-16 md:py-24 overflow-hidden">

      {/* Title + Building */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-[#003e7e]">Get in Touch</h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium mt-4">
            We'd love to hear from you! Whether you have a question,
            feedback, or want to learn more about the project.
          </p>
          <div className="w-12 h-1 bg-[#003e7e] mt-5 rounded-full" />
        </div>
        <div className="flex-shrink-0 hidden md:block">
          <img src={rockwellBuilding} alt="Rockwell Building" className="w-[400px] lg:w-[600px] xl:w-[820px] object-contain" />
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT column */}
        <div
          ref={leftRef}
          className="flex flex-col gap-5 transition-all duration-700 ease-out"
          style={{ opacity: leftInView ? 1 : 0, transform: leftInView ? 'translateY(0)' : 'translateY(40px)' }}
        >

          {/* Project Collaboration */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex items-center justify-center flex-shrink-0">
                <img src={myIcon} alt="Icon" className="w-10 h-10 object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#003e7e] mb-1">Project Collaboration</h3>
                <p className="text-md text-gray-600 leading-relaxed font-medium">
                  This project was developed in collaboration with Rockwell Automation
                  as part of an educational initiative focused on cybersecurity
                  awareness and industrial security training.
                </p>
              </div>
              <div className="flex sm:flex-col items-center justify-center gap-4 sm:gap-8 ml-0 sm:ml-2 flex-shrink-0">
                <img src={rockwellLogo} alt="Rockwell" className="h-8 object-contain" />
                <img src={tecLogo} alt="Tec" className="h-8 object-contain" />
              </div>
            </div>
          </div>

          {/* Development Team */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center flex-shrink-0">
                <img src={PlayerOneLogo} alt="Icon" className="w-10 h-10 object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#003e7e] mb-1">Development Team</h3>
                <p className="text-md text-gray-600 leading-relaxed mb-3 font-medium">
                  Developed by a team of Computer Engineering students from Tecnológico de Monterrey as part of the Software Construction and Decision Making challenge.
                </p>
              </div>
            </div>
          </div>

          {/* Rockwell links */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center flex-shrink-0">
                <img src={romboRockwell} alt="Icon" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#003e7e]">Rockwell Automation</h3>
                <p className="text-md text-gray-600">Learn more about Rockwell Automation and their industrial cybersecurity solutions.</p>
              </div>
            </div>
            <RockwellLink icon={<img src={urlIcon} alt="" className="w-7 h-7 object-contain ml-2" />} label="Official Website" desc="rockwellautomation.com" href="https://www.rockwellautomation.com/en-us.html" />
            <RockwellLink icon={<img src={cyberIcon} alt="" className="w-7 h-7 object-contain ml-2" />} label="Cybersecurity Solutions" desc="Industrial security for a connected world." href="https://www.rockwellautomation.com/en-us/capabilities/industrial-cybersecurity/products-services/network-security.html" />
            <RockwellLink icon={<img src={contactIcon} alt="" className="w-7 h-7 object-contain ml-2" />} label="Contact Rockwell Automation" desc="Reach out to their global team." href="https://www.rockwellautomation.com/en-us/company/about-us/contact-us.html" />
          </div>

        </div>

        {/* RIGHT column */}
        <div
          ref={rightRef}
          className="flex flex-col gap-5 transition-all duration-700 ease-out delay-150"
          style={{ opacity: rightInView ? 1 : 0, transform: rightInView ? 'translateY(0)' : 'translateY(40px)' }}
        >
          <div className="rounded-2xl overflow-hidden shadow-sm flex justify-center items-center p-4">
            <img src={customBanner} alt="Cybersecurity Banner" className="w-[85%] h-auto object-contain transition-transform duration-500 hover:scale-105" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#003e7e] mb-3 mt-4">Connect With Us</h3>
            <p className="text-lg text-gray-600 mb-4">Follow our progress and explore more about the project.</p>
            <div className="grid grid-cols-2 gap-3">
              <SocialLink icon="✉️" label="Email"    href="mailto:team@example.com" />
              <SocialLink icon="🐙" label="GitHub"   href="https://github.com" />
              <SocialLink icon="💼" label="LinkedIn" href="https://linkedin.com" />
              <SocialLink icon="🌐" label="Website"  href="https://example.com" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}