// utils/getUserNotifications.js
export const getUserNotifications = (questions, answers, userEmail) => {
  return questions.map((question) => {
    const matchingAnswer = answers.find((ans) => {
      const pdfMatch = question.pdf?.some(qpdf => ans.pdf?.includes(qpdf));
      const imageMatch = question.image?.some(qimg => ans.questionImages?.includes(qimg));
      const emailMatch = ans.useremail === userEmail;
      return (pdfMatch || imageMatch) && emailMatch;
    });

   return {
  date: question.dateCreated || null,
  course: question.course || '',
  status: matchingAnswer?.status || 'Pending'
};
  });
};
