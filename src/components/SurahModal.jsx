const SurahModal = ({theme, loadingSurah, surahModalBoxRef, surahModalRef, closeSurahModal, surahDetail, reciterId, langId}) => {
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
                    {surahDetail.verses?.map(verse =>
                        <div key={verse.id} className="space-y-2 mb-2">
                            <p dir="rtl" className="text-2xl mb-1 font-noto-naskh-arabic">{verse.text.replaceAll("ٱ", "ا")} <span className={`rounded-[50%] border ${theme === "light" ? "border-black" : "border-white"} inline-block p-2 text-xl`}>{verse.id}</span></p>
                            <p className="text-lg">{verse.translation}</p>
                            <hr />
                        </div>)}
                    <audio className="w-full sticky bottom-0" controls src={surahDetail.audio?.[reciterId]?.url}></audio>
                </>}
            </div>

            <form method="dialog" className="modal-backdrop">
                <button onClick={closeSurahModal}>close</button>
            </form>
        </dialog>
    );
};

export default SurahModal;