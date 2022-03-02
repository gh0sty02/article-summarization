import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from gensim import corpora
import re
from string import punctuation
nltk.download('stopwords')
nltk.download('omw-1.4')
nltk.download('punkt')

lemmatizer = WordNetLemmatizer()
punctuations = punctuation


def tokenizer(data: str):
    """Returns a list of preprocessed lowercase words in the text. Preprocessing includes
    removing non alphabetical characters, changing the words to lowercase, lemmatization
    and removing the stop words.

    :param data: The text required to be tokenized
    :return: A list of all the preprocessed words in the data
    """
    stop_words = stopwords.words('english')
    tokenlist = []
    for sent in data:
        text = re.sub(r'\d+','',sent) #remove numbers
        text = re.sub(r'[^a-zA-Z]+',' ',text)
        tokens = text.lower().split()
        tokens = [token for token in tokens if token not in stop_words]
        tokens = [lemmatizer.lemmatize(token) for token in tokens]
        tokenlist.append(tokens)
    return tokenlist


def find_sentences(data: str):
    """Return a sentence-tokenized copy of text.

    :param data: The text to be tokenized
    :return: A list of all sentences in the data
    """
    sentences = nltk.sent_tokenize(data)
    return sentences


def create_corpus(data: str):
    """Returns a mapping between normalized words and their integer ids and a bag of words
    converted form of the data.

    :param data: The text which is to be mapped
    :return corpus: List of (token_id, token_count) tuples
            dic: Dictionary mapping of words to its integer ids
    """
    dic = corpora.Dictionary(data)
    corpus = [dic.doc2bow(text) for text in data]
    return corpus, dic