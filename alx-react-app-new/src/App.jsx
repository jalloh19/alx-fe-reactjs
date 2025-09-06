import Header from "./components/Header";
import MainContent from "./components/MainContent";
import UserProfile from "./components/UserProfile";
import Footer from "./components/Footer";

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <MainContent />
        <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      </div>
      <Footer />
    </div>
  );
}

export default App;



