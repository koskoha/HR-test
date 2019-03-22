window.certificate = undefined;

function HTMLtoPDF(save){
  html2canvas($('#HTMLtoPDF')[0], {windowWidth: 860}).then(function(canvas) {
    let image = canvas.toDataURL('image/png');
    window.certificate = image;
    let doc = new jsPDF('p','mm');
    doc.addImage(image,'PNG', 0, 10);
    doc.save('certificate.pdf');
    if(!save){
      sendEmail();
    }
  });
}