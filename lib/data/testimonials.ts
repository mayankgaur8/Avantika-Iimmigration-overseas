export interface Testimonial {
  id: string
  name: string
  role: string
  country: string
  flag: string
  avatar: string
  rating: number
  text: string
  service: string
  date: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Software Engineer',
    country: 'Now in Canada',
    flag: '🇨🇦',
    avatar: 'PS',
    rating: 5,
    text: "Avantika Immigration made our Canada PR journey completely stress-free. From document preparation to the final approval, they guided us at every step. We got our ITA within 6 months! Highly recommend their Express Entry service.",
    service: 'Canada Express Entry',
    date: 'March 2024',
  },
  {
    id: '2',
    name: 'Rahul Mehta',
    role: 'Mechanical Engineer',
    country: 'Now in Germany',
    flag: '🇩🇪',
    avatar: 'RM',
    rating: 5,
    text: "The Germany Opportunity Card process was confusing at first, but the team at Avantika broke it down beautifully. They even helped me translate my documents and prepare for my embassy interview. Got my visa in under 3 months!",
    service: 'Germany Opportunity Card',
    date: 'January 2024',
  },
  {
    id: '3',
    name: 'Ananya Krishnan',
    role: 'Registered Nurse',
    country: 'Now in Australia',
    flag: '🇦🇺',
    avatar: 'AK',
    rating: 5,
    text: "I was overwhelmed by the Australian immigration process. The consultants at Avantika not only helped me with my 189 visa but also with the skills assessment and state nomination. Professional, transparent, and results-driven team.",
    service: 'Australia Skilled Independent Visa',
    date: 'February 2024',
  },
  {
    id: '4',
    name: 'Vikram Patel',
    role: 'Finance Manager',
    country: 'Now in UAE',
    flag: '🇦🇪',
    avatar: 'VP',
    rating: 5,
    text: "Got my UAE Golden Visa with their help. The process was super fast — just 3 weeks from application to approval. The team is knowledgeable, responsive, and very professional. Worth every rupee!",
    service: 'UAE Golden Visa',
    date: 'April 2024',
  },
  {
    id: '5',
    name: 'Sneha Iyer',
    role: 'Postgraduate Student',
    country: 'Now in UK',
    flag: '🇬🇧',
    avatar: 'SI',
    rating: 5,
    text: "Avantika helped me get admitted to a Russell Group university and then secured my UK Student Visa. They even reviewed my Statement of Purpose three times until it was perfect. Now I'm studying at my dream university!",
    service: 'UK Student Visa + Admissions',
    date: 'September 2023',
  },
  {
    id: '6',
    name: 'Arjun Nair',
    role: 'IT Project Manager',
    country: 'Now in Canada',
    flag: '🇨🇦',
    avatar: 'AN',
    rating: 4,
    text: "The IELTS coaching program got me a Band 8 in my first attempt. The trainers are excellent, the mock tests are very realistic, and the study material is top-notch. Then they helped me apply for PR. Amazing end-to-end service!",
    service: 'IELTS Coaching + Canada PR',
    date: 'November 2023',
  },
]
