import Welcome from '../components/welcome';
import Offerings from '../components/offerings';
import AIFeatures from '../components/ai_info';
import HomeSignup from '../components/home_signup';
import Footer from '../components/footer';

export default function About() {
  return (
    <div>
      <Welcome />
      <Offerings />
      <AIFeatures />
      <HomeSignup />
      <Footer />
    </div>
  );
}