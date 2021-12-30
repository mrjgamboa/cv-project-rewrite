import './styles/App.css';
import Header from './components/Header/Header';
import CVForm from './components/CV-Form/CVForm';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <div className="App">
      <Header title='CV M4ker' />
      <main className='main'>
        <CVForm />
      </main>
      <Footer 
        creator='L4ck'
        link='https://github.com/mrjgamboa'
      />
    </div>
  );
};
