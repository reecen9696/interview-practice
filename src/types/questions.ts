export interface Flashcard {
  question: string;
  answer: string;
}

export interface MultipleChoice {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface FillInTheGap {
  sentence: string;
  gaps: string[];
}

export interface CodeLine {
  code: string;
  explanation: string[];
}

export interface CodeWalkthrough {
  codeLines: CodeLine[];
}

export interface TopicQuestions {
  flashcards: Flashcard[];
  multipleChoice: MultipleChoice[];
  fillInTheGap: FillInTheGap[];
  codeWalkthrough: CodeWalkthrough[];
}

export interface QuestionsData {
  [topicName: string]: TopicQuestions;
}
