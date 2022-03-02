import gensim
import nltk
from gensim.models.ldamodel import LdaModel
from preprocess import create_corpus, tokenizer, find_sentences
import json

#https://features.propublica.org/climate-migration/model-how-climate-refugees-move-across-continents/


def topic_model(corpus: str, dic: dict, number_of_topics: int):
    """Returns a lda model based on the corpus and number of topics.

    :param corpus: list of tuples of the form (token_id, token_count) ie. bag of words
    :param dic: Dictionary mapping of words to its integer ids
    :param number_of_topics: Number of topics or summaries that are needed to be created
    :return: LDA model
    """
    model = LdaModel(corpus=corpus, id2word=dic, num_topics=number_of_topics)
    return model


def get_topic_keywords(model: gensim.models.ldamodel.LdaModel):
    """Returns the list of topic keywords along with its score for every topic
    based on the number of topics.

    :param model: LDA model
    :return: Dictionary of topic number and its corresponding keywords
    """
    num_topics = model.num_topics
    topic_words_dic = {}
    for i in range(num_topics):
        topic_words_dic[i] = None
    for k in topic_words_dic.keys():
        topic_words_dic[k] = model.show_topic(k)
    topic_words_dic = { "{key}".format(key = key) : str(value) for key, value in topic_words_dic.items()}
    # topic_words_dic = [{'key': k, 'value': v} for k, v in topic_words_dic.items()]
    # topic_dict = {'topics' : topic_words_dic}
    topic_words_json = json.dumps( topic_words_dic)
    return topic_words_json
    # return topic_words_dic


def get_sentence_distribution(model: gensim.models.ldamodel.LdaModel, dic: dict, sentences: list):
    """Returns a list of topic number and corresponding score for every sentence
    in the text.

    :param model: LDA model
    :param dic: Dictionary mapping of words to its integer ids
    :param sentences: list of sentences in the text
    :return:a list of tuples of the form (topic_number, score)
    """
    distribution = []
    for sentence in sentences:
        #sent_tokens = tokenizer(sentence)
        sent_tokens = nltk.word_tokenize(sentence)
        bow = dic.doc2bow(sent_tokens)
        #bow = dic.doc2bow(sentence)
        dist = model.get_document_topics(bow)
        dist = max(dist, key=lambda x:x[1])
        distribution.append(dist)
    return distribution



def group_sentences(model: gensim.models.ldamodel.LdaModel, dists: dict, sentences: list):
    """Returns groups of sentences for every topic based on the number of topics
    If number of topics > 1, returns a dictionary where for every topic, there is
    a corresponding list of tuples of the form (sentence_number, score) sorted
    in a descending order
    If number of topics = 1, returns a dictionary with 1 item which includes a
    list of tuples of the form (sentence_number, score) sorted in a descending
    order. The score is calculated by dividing the number of common keywords
    by the total number of keywords.
    :param model: LDA model
    :param dists: a list of tuples of the form (topic_number, score)
    :param sentences: a list of sentences in the original text
    :return: Dictionary of topic number and sentences corresponding to the topic
    """
    no_topics = model.num_topics
    if no_topics != 1:
        sentence_groups = {}
        for i in range(no_topics):
            sentence_groups[i] = []
        for i in range(len(dists)):
            
            key = dists[i][0]
            val = (i, dists[i][1])
            sentence_groups[key].append(val)
        for k, v in sentence_groups.items():
            v.sort(key=lambda x: x[1], reverse=True)
        return sentence_groups
    else:
        scores = {}
        sentence_groups = {}
        keywords = [item[0] for item in model.show_topic(0)]
        
        for i in range(len(sentences)):
            common_keywords = len(set(sentences[i].split()) & set(keywords))
            score = common_keywords/len(sentences[i].split())
            scores[i] = score
        scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        #print(len(scores))
        #print(scores)
        sentence_groups[0] = scores
        return sentence_groups


def get_summaries(groups: dict, sentences: list):
    """Returns a string of text(summary) for every topic defined by number of topics

    :param groups: Dictionary of topic number and sentences corresponding to the topic
    :param sentences: List of sentences in the original text
    :return: Dictionary of topic number and corresponding extracted summary
    """
    summaries = {}
    for k, v in groups.items():
        no_of_sentences = len(v)
        if no_of_sentences > 10:
            v = v[:10]
        summaries[k] = []
        for sent_index in v:
            summaries[k].append(sentences[sent_index[0]])
    for k, v in summaries.items():
        summaries[k] = ' '.join(v)
    json_summaries = [{'topic': k, 'summary': v} for k, v in summaries.items()]
    json_summaries = json.dumps(json_summaries)
    return json_summaries
