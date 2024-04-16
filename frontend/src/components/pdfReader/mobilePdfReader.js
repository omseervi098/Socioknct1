<div className="w-full py-3 px-3 overflow-auto ">
  <Document
    file={file}
    onLoadSuccess={onDocumentLoadSuccess}
    className={`h-[${height}px] w-max  flex justify-center items-center gap-3`}
    loading="Loading..."
  >
    {/* repeat page numPages times */}
    {[...Array(numPages)].map((e, i) => (
      <Page
        key={i + 1}
        pageNumber={i + 1}
        height={height}
        className={`h-[${height}px]`}
        loading="<h1>Loading...</h1>"
      />
    ))}
  </Document>
</div>;
