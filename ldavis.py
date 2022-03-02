import json
import pyLDAvis
import pyLDAvis.gensim as pyg

#https://stackabuse.com/python-for-nlp-working-with-the-gensim-library-part-2/
def get_LDA_vis_html(model,corpus):
    topic_term_dists = model.get_term_topics
    doc_topic_dists = model.get_document_topics
    vocab = model.id2word
    vis = pyg.prepare(model,corpus,model.id2word,)
    #vis = pyLDAvis.gensim.prepare(model,corpus,model.id2word)
    return pyLDAvis.prepared_data_to_html(vis)
    #return pyLDAvis.prepared_data_to_html(vis)