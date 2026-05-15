import { FaPlay, FaStop } from "react-icons/fa6";
import { HiRocketLaunch } from "react-icons/hi2";

const SpecificVerse = ({ surahs, surahDetail, verse, surahId, setSurahId, verseId, setVerseId, langId, theme, currentVerseId, handleStop, handlePlayVerse }) => {
    return (
        <div className="space-y-6">
            <form className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="surah">{langId === 1 ? "সূরা" : "Surah"}</label>
                    <select id="surah" className="select w-full mt-1" onChange={(e) => {
                        setSurahId(Number(e.target.value));
                        handleStop();
                    }}>
                        {surahs?.map(surah => <option key={surah.id} value={surah.id}>{surah.transliteration}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="verse">{langId === 1 ? "আয়াত" : "Verse"}</label>
                    <select id="verse" className="select w-full mt-1" onChange={(e) => {
                        setVerseId(Number(e.target.value));
                        handleStop();
                    }}>
                        {surahDetail.verses?.map(verse => <option key={verse.id} value={verse.id}>{verse.id}</option>)}
                    </select>
                </div>
            </form>
            <h3 className="text-center text-2xl font-bold">{verse?.surah?.transliteration}: {verse?.verse?.id}</h3>
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    {currentVerseId[0] === surahId && currentVerseId[1] === verseId ? <button
                        onClick={handleStop}
                        className={`btn btn-circle ${theme === "light" ? "btn-base-300" : "btn-neutral"}`}
                    >
                        <FaStop />
                    </button> : <button
                        onClick={() => handlePlayVerse(surahId, verseId)}
                        className={`btn btn-circle ${theme === "light" ? "btn-base-300" : "btn-neutral"}`}
                    >
                        <FaPlay />
                    </button>}
                    <div className="w-full">
                        <p dir="rtl" className="text-2xl/12 mb-1 font-noto-naskh-arabic">{verse?.verse?.text.replaceAll("ٱ", "ا")}</p>
                        <p className="text-lg text-left">{verse?.verse?.translation}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecificVerse;