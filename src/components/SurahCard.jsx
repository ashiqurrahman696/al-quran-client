const SurahCard = ({ theme, surah, openSurahModal }) => {
    return (
        <div className={`card w-full shadow-sm cursor-pointer ${theme === "light" ? "bg-black/5" : "bg-white/5"}`} key={surah.id} onClick={() => openSurahModal(surah.id)}>
            <div className="card-body text-center">
                <h2 className="card-title justify-center">{surah.id}. {surah.transliteration}</h2>
                <p>{surah.translation}</p>
            </div>
        </div>
    );
};

export default SurahCard;