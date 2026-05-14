const SpecificVerse = ({surahs, surahDetail, verse, setSurahId, setVerseId, reciterId, langId}) => {
    return (
        <div className="space-y-6">
            <form className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="surah">{langId === 1 ? "সূরা" : "Surah"}</label>
                    <select id="surah" className="select w-full mt-1" onChange={(e) => setSurahId(Number(e.target.value))}>
                        {surahs?.map(surah => <option key={surah.id} value={surah.id}>{surah.transliteration}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="verse">{langId === 1 ? "আয়াত" : "Verse"}</label>
                    <select id="verse" className="select w-full mt-1" onChange={(e) => setVerseId(Number(e.target.value))}>
                        {surahDetail.verses?.map(verse => <option key={verse.id} value={verse.id}>{verse.id}</option>)}
                    </select>
                </div>
            </form>
            <h3 className="text-center text-2xl font-bold">{verse?.surah?.transliteration}: {verse?.verse?.id}</h3>
            <div className="space-y-4">
                <p dir="rtl" className="text-2xl/12 font-noto-naskh-arabic">{verse?.verse?.text.replaceAll("ٱ", "ا")}</p>
                <p className="text-lg">{verse?.verse?.translation}</p>
            </div>
        </div>
    );
};

export default SpecificVerse;