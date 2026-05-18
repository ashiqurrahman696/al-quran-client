import { useEffect, useRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SurahModal from "./components/SurahModal";
import SpecificVerse from "./components/SpecificVerse";
import SearchVerse from "./components/SearchVerse";
import useAxios from "./hooks/useAxios";
import SurahList from "./components/SurahList";
import Sidebar from "./components/Sidebar";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light")
  const [langId, setLangId] = useState(1);
  const [arFontSize, setArFontSize] = useState(24);
  const [trFontSize, setTrFontSize] = useState(16);
  const [loadingSurahs, setLoadingSurahs] = useState(true);
  const [loadingSurah, setLoadingSurah] = useState(true);
  const [surahs, setSurahs] = useState([]);
  const [reciters, setReciters] = useState([]);
  const [reciterId, setReciterId] = useState(1);
  const [surahId, setSurahId] = useState(null);
  const [surahDetail, setSurahDetail] = useState({});
  const [verse, setVerse] = useState({});
  const [currentVerseId, setCurrentVerseId] = useState([null, null]);
  const [verseId, setVerseId] = useState(1);
  const [searchSurah, setSearchSurah] = useState("");
  const [searchVerse, setSearchVerse] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSurahPlaying, setIsSurahPlaying] = useState(false);
  const filteredSurahs = searchSurah ? surahs.filter(surah => surah.transliteration.toLowerCase().includes(searchSurah.toLowerCase())) : surahs;
  const axios = useAxios();
  const verseAudioRef = useRef(new Audio());
  const surahAudioRef = useRef(new Audio());
  const languages = [
    {
      id: 1,
      name: "বাংলা",
      code: "bn"
    },
    {
      id: 2,
      name: "English",
      code: "en"
    },
  ];

  // Update the data-theme attribute on the html tag whenever the state changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);
  
  // todo: Load reciters
  useEffect(() => {
    axios.get('https://al-quran-2.netlify.app/reciters.json')
    .then(res => setReciters(res.data))
    .catch(err => console.log(err));
  }, [axios]);
  
  // todo: Load all surahs
  useEffect(() => {
    axios.get(`/all-surahs/${languages[langId - 1].code}`)
    .then(res => {
        setSurahs(res.data.surahs);
        setLoadingSurahs(false);
      })
      .catch(err => console.log(err));
  }, [axios, langId]);

  // todo: Load specific surah
  useEffect(() => {
    setLoadingSurah(true);
    axios.get(`/surah/${surahId}/${languages[langId - 1].code}`)
      .then(res => {
        setSurahDetail(res.data);
        setLoadingSurah(false);
      })
      .catch(err => console.log(err));
  }, [surahId, axios, langId]);

  // todo: Load specific verse
  useEffect(() => {
    axios.get(`/surah/${surahId}/verse/${verseId}/${languages[langId - 1].code}`)
      .then(res => {
        setVerse(res.data);
      })
      .catch(err => console.log(err));
  }, [surahId, verseId, axios, langId]);

  // todo: Search verses
  useEffect(() => {
    axios.get(`/search/${searchVerse}/${languages[langId - 1].code}`)
      .then(res => {
        setSearchResults(res.data.results);
      })
      .catch(err => console.log(err));
  }, [searchVerse, axios, langId]);

  const surahModalRef = useRef(null);
  const surahModalBoxRef = useRef(null);

  const handleTabSelect = (index, lastIndex, event) => {
    setSurahId(null);
    setSearchSurah("");
    handleStop();
    if(index === 1){
      setSurahId(1);
      setVerseId(1);
    }
    if(index === 2){
      setSearchVerse("");
      setSearchResults([]);
    }
  };

  const openSurahModal = (id) => {
    setSurahId(id);
    surahModalRef.current.showModal();
    if (surahModalBoxRef.current) {
      surahModalBoxRef.current.scrollTo({
        top: 0,
      });
    }
  };

  const closeSurahModal = () => {
    surahModalRef.current.close();
    handleStop();
  };

  const handlePlaySurah = (url) => {
    const surahAudio = surahAudioRef.current;

    surahAudio.pause();
    surahAudio.currentTime = 0;

    surahAudio.src = url;
    surahAudio.play();
    setIsSurahPlaying(true);

    surahAudio.onended = () => {
      setIsSurahPlaying(false);
    }
  }

  const handlePlayVerse = (surahId, verseId) => {
    const verseAudio = verseAudioRef.current;
    const verseAudioUrl = `https://everyayah.com/data/${reciters[reciterId - 1].slug}_128kbps/${surahId.toString().padStart(3, "0")}${verseId.toString().padStart(3, "0")}.mp3`;

    verseAudio.pause();
    verseAudio.currentTime = 0;

    verseAudio.src = verseAudioUrl;
    verseAudio.play();

    setCurrentVerseId([surahId, verseId]);
    setIsSurahPlaying(false);

    verseAudio.onended = () => {
      setCurrentVerseId([null, null]);
    };
  }

  const handleStop = () => {
    const verseAudio = verseAudioRef.current;
    const surahAudio = surahAudioRef.current;

    verseAudio.pause();
    verseAudio.currentTime = 0;

    surahAudio.pause();
    surahAudio.currentTime = 0;

    setCurrentVerseId([null, null]);
    setIsSurahPlaying(false);
  };

  return (
    <div className={`max-w-7xl mx-auto p-4 ${theme === "light" ? "text-black" : "text-white"}`}>
      <h1 className="text-center text-4xl font-bold mb-6">{langId === 1 ? "আল কোরআন" : "Al-Quran"}</h1>
      <Tabs onSelect={handleTabSelect}>
        <TabList>
          <Tab>{langId === 1 ? "সূরার তালিকা" : "Surah List"}</Tab>
          <Tab>{langId === 1 ? "নির্দিষ্ট আয়াত" : "Specific verse"}</Tab>
          <Tab>{langId === 1 ? "আয়াতসমূহ খুঁজুন" : "Search verses"}</Tab>
        </TabList>
        <TabPanel>
          {loadingSurahs || surahs?.length === 0 ? <p className="text-center text-2xl font-semibold">{langId === 1 ? "সূরার তালিকা লোড হচ্ছে" : "Loading list of surah"}...</p> : <SurahList
            theme={theme}
            filteredSurahs={filteredSurahs}
            openSurahModal={openSurahModal}
            langId={langId}
            setSearchSurah={setSearchSurah}
            searchSurah={searchSurah}
          />}
          <SurahModal
            theme={theme}
            loadingSurah={loadingSurah}
            surahModalBoxRef={surahModalBoxRef}
            surahModalRef={surahModalRef}
            closeSurahModal={closeSurahModal}
            surahDetail={surahDetail}
            reciterId={reciterId}
            langId={langId}
            handlePlaySurah={handlePlaySurah}
            handlePlayVerse={handlePlayVerse}
            handleStop={handleStop}
            currentVerseId={currentVerseId}
            surahAudioRef={surahAudioRef}
            isSurahPlaying={isSurahPlaying}
            setIsSurahPlaying={setIsSurahPlaying}
            arFontSize={arFontSize}
            trFontSize={trFontSize}
          />
        </TabPanel>
        <TabPanel>
          <SpecificVerse
            surahs={surahs}
            surahDetail={surahDetail}
            verse={verse}
            surahId={surahId}
            setSurahId={setSurahId}
            verseId={verseId}
            setVerseId={setVerseId}
            reciterId={reciterId}
            langId={langId}
            theme={theme}
            currentVerseId={currentVerseId}
            handleStop={handleStop}
            handlePlayVerse={handlePlayVerse}
            arFontSize={arFontSize}
            trFontSize={trFontSize}
          />
        </TabPanel>
        <TabPanel>
          <SearchVerse
            theme={theme}
            searchVerse={searchVerse}
            setSearchVerse={setSearchVerse}
            searchResults={searchResults}
            langId={langId}
            handlePlayVerse={handlePlayVerse}
            handleStop={handleStop}
            currentVerseId={currentVerseId}
            arFontSize={arFontSize}
            trFontSize={trFontSize}
          />
        </TabPanel>
      </Tabs>
      <Sidebar
        theme={theme}
        setTheme={setTheme}
        languages={languages}
        langId={langId}
        setLangId={setLangId}
        reciters={reciters}
        reciterId={reciterId}
        setReciterId={setReciterId}
        handleStop={handleStop}
        arFontSize={arFontSize}
        setArFontSize={setArFontSize}
        trFontSize={trFontSize}
        setTrFontSize={setTrFontSize}
      />
    </div>
  )
}

export default App
