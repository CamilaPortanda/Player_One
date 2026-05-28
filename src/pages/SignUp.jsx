import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const apiBase = import.meta.env.VITE_API_URL;

function SignUp() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [industryId, setIndustryId] = useState('');
  const [industries, setIndustries] = useState([]);
  const [company, setCompany] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [dialCode, setDialCode] = useState("");
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch countries
  useEffect(() => {
    fetch("/PhoneNumberMetadata.xml")
      .then(res => res.text())
      .then(text => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const territories = xml.querySelectorAll("territory");
        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        const list = [];
        territories.forEach((t) => {
          const id = t.getAttribute("id");
          const code = t.getAttribute("countryCode");
          if (id && code && id.length === 2) {
            list.push({ id, dialCode: `+${code}`, name: regionNames.of(id) || id });
          }
        });
        list.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(list);
      });
  }, []);

  // Fetch industries from backend
  useEffect(() => {
    axios.get(`${apiBase}/api/industries`)
      .then(res => setIndustries(res.data))
      .catch(() => setError('Could not load industries'))
  }, [])

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleRegister = async () => {
    setError('');
    if (!name || !lastName || !email || !password || !phone || !industryId || !company || !jobPosition) {
      setError('Por favor, completa todos los campos');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    sessionStorage.setItem('signUpData', JSON.stringify({
      first_name:   name,
      last_name:    lastName,
      email:        email,
      password:     password,
      phone:        `${dialCode}${phone}`,
      industry_id:  Number(industryId),
      company:      company,
      job_position: jobPosition,
      country:      country
    }))
    navigate('/choosePfp')
  };

  const inputClass = "w-full px-3.5 py-2.5 border border-[#bebebe] rounded-lg bg-transparent text-sm outline-none text-[#003e7e] placeholder-[#003e7e]"

  return (
    <div className="bg-[#9B0032] min-h-screen">
      <Header />
      <main className="flex justify-center items-center min-h-[calc(100vh-80px)] py-8 px-4">
        <div className="bg-[#fcfcfc] rounded-2xl p-6 md:p-10 w-full max-w-[550px] shadow-[0px_4px_12px_rgba(0,0,0,0.20)]">

          <Link className="text-[#003e7e] hover:text-[#003e7e80] no-underline text-sm" to="/logIn">
            ← Back
          </Link>

          <h2 className="text-center text-[28px] md:text-[32px] font-normal mt-2.5 mb-0 text-[#003e7e]">
            Sign Up
          </h2>

          <p className="text-center text-[13px] text-[#003e7e] mt-5">
            ¿Already have an account?{' '}
            <Link to="/logIn" className="text-[#003e7e] hover:text-[#003e7e80] underline">Log in</Link>
          </p>

          {error ? (
            <div className="mt-4 mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 border border-red-100" role="alert">
              {error}
            </div>
          ) : null}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">

            <input type="text" placeholder="Name(s)" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />

            {/* Phone field */}
            <div className="flex">
              <div className="relative w-[140px]">
                <input
                  type="text"
                  placeholder="+"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setShowDropdown(true); }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                  className="w-full px-3.5 py-2.5 border border-[#bebebe] rounded-l-lg bg-transparent text-sm outline-none text-[#003e7e] placeholder-[#003e7e]"
                />
                {showDropdown && (
                  <div className="absolute z-10 top-full left-0 w-[250px] max-h-48 overflow-y-auto bg-white border border-[#bebebe] rounded-lg shadow-md mt-1">
                    {countries.filter(c =>
                      c.name.toLowerCase().includes(search.toLowerCase()) || c.dialCode.includes(search)
                    ).map((c) => (
                      <div key={c.id} onMouseDown={() => { setSearch(`${c.dialCode} ${c.name}`); setDialCode(c.dialCode); setCountry(c.name); setShowDropdown(false); }}
                        className="px-4 py-2 text-sm text-[#003e7e] hover:bg-[#003e7e] hover:text-white cursor-pointer">
                        {c.dialCode} — {c.name}
                      </div>
                    ))}
                    {countries.filter(c =>
                      c.name.toLowerCase().includes(search.toLowerCase()) || c.dialCode.includes(search)
                    ).length === 0 && (
                      <div className="px-4 py-2 text-sm text-gray-400">Sin resultados</div>
                    )}
                  </div>
                )}
              </div>
              <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#bebebe] border-l-0 rounded-r-lg bg-transparent text-sm outline-none text-[#003e7e] placeholder-[#003e7e]" />
            </div>

            <input type="text" placeholder="Last Name(s)" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />

            {/* Industry from backend */}
            <select
              value={industryId}
              onChange={(e) => setIndustryId(e.target.value)}
              className={inputClass}
            >
              <option value="">Industry</option>
              {industries.map(ind => (
                <option key={ind.industry_id} value={ind.industry_id}>
                  {ind.industry_name}
                </option>
              ))}
            </select>

            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />

            <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass} />

            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />

            <select value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} className={inputClass}>
              <option value="">Job Position</option>
              <option value="Administrative">Administrative</option>
              <option value="Technician">Technician</option>
              <option value="Staff">Staff</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="Vice President">Vice President</option>
              <option value="Executive">Executive</option>
              <option value="Others">Other</option>
            </select>

          </div>

          <button
            onClick={handleRegister}
            className="block mx-auto mt-6 w-fit text-center px-10 py-2.5 border border-[#aaa] rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm text-white cursor-pointer transition-colors"
          >
            Ready
          </button>

        </div>
      </main>
    </div>
  )
}

export default SignUp