function Timeline({ timeline }) {
  return (
    <div className="section-box">
      <h2 className="section-title">Story Timeline</h2>

      <div>
        {timeline?.length > 0 ? (
          timeline.map((item, index) => (
            <div key={index} className="timeline-item">
              <p className="timeline-date">{item.date}</p>
              <p>{item.event}</p>
            </div>
          ))
        ) : (
          <p className="section-text">No timeline available.</p>
        )}
      </div>
    </div>
  );
}

export default Timeline;
