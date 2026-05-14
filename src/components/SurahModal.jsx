import { FaPlay, FaStop } from "react-icons/fa6";

const SurahModal = ({ theme, loadingSurah, surahModalBoxRef, surahModalRef, closeSurahModal, surahDetail, reciterId, langId, handlePlayVerse, handleStop, currentVerseId, handlePlaySurah, isSurahPlaying }) => {
    return (
        <dialog ref={surahModalRef} className="modal">
            <div ref={surahModalBoxRef} className="modal-box max-w-4xl max-h-9/10">
                <div className="sticky top-0 right-0 float-right">
                    <form method="dialog">
                        <button onClick={closeSurahModal} className="btn btn-sm btn-circle btn-error">✕</button>
                    </form>
                </div>
                {loadingSurah ? <p className="text-center text-2xl font-semibold">{langId === 1 ? "সূরা লোড হচ্ছে" : "Loading surah"}...</p> : <>
                    <h3 className="font-bold text-2xl text-center mb-6">{surahDetail.transliteration} (<span className="capitalize">{surahDetail.type}</span> - {langId === 1 ? "আয়াত" : "Verse"} {surahDetail.total_verses})</h3>
                    <div className="text-center mb-6">
                        {isSurahPlaying ?
                            <button
                                onClick={handleStop}
                                className={`btn ${theme === "light" ? "btn-base-300" : "btn-neutral"}`}
                            >
                                <FaStop />
                                <span>Stop</span>
                            </button> :
                            <button
                                onClick={() => handlePlaySurah(surahDetail.audio?.[reciterId]?.url)}
                                className={`btn ${theme === "light" ? "btn-base-300" : "btn-neutral"}`}
                            >
                                <FaPlay />
                                <span>Play</span>
                            </button>
                        }
                    </div>
                    {surahDetail.verses?.map(verse =>
                        <div key={verse.id} className="space-y-2 mb-2">
                            <div className="flex items-center gap-4">
                                {currentVerseId[0] === surahDetail.id && currentVerseId[1] === verse.id ? <button
                                    onClick={handleStop}
                                    className={`btn btn-circle ${theme === "light" ? "btn-base-300" : "btn-neutral"}`}
                                >
                                    <FaStop />
                                </button> : <button
                                    onClick={() => handlePlayVerse(surahDetail.id, verse.id)}
                                    className={`btn btn-circle ${theme === "light" ? "btn-base-300" : "btn-neutral"}`}
                                >
                                    <FaPlay />
                                </button>}
                                <div className="w-full">
                                    <p dir="rtl" className="text-2xl/12 mb-1 font-noto-naskh-arabic">{verse.text.replaceAll("ٱ", "ا")} <span className={`rounded-[50%] border ${theme === "light" ? "border-black" : "border-white"} inline-block p-2 text-xl`}>{verse.id}</span></p>
                                    <p className="text-lg text-left">{verse.translation}</p>
                                </div>
                            </div>
                            <hr />
                        </div>)}
                    {/* <audio ref={surahAudioRef} className="w-full sticky bottom-0" controls src={surahDetail.audio?.[reciterId]?.url}></audio> */}
                </>}
            </div>

            <form method="dialog" className="modal-backdrop">
                <button onClick={closeSurahModal}>close</button>
            </form>
        </dialog>
    );
};

export default SurahModal;