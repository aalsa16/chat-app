import tflearn
import pickle
import json
import nltk
from nltk.stem.lancaster import LancasterStemmer
import numpy
import random
stemmer = LancasterStemmer()

class ChatBot:
    def __init__(self):
        with open("intents.json") as file:
            self.data = json.load(file)

        with open("data.pickle", "rb") as f:
            self.words, self.labels, self.training, self.output = pickle.load(f)

        self.createModel()

    def createModel(self):
        net = tflearn.input_data(shape=[None, len(self.training[0])])
        net = tflearn.fully_connected(net, 8)
        net = tflearn.fully_connected(net, 8)
        net = tflearn.fully_connected(net, len(self.output[0]), activation='softmax')
        net = tflearn.regression(net)

        self.model = tflearn.DNN(net)

        self.model.load("model.tflearn")

    def bag_of_words(self, s, words):
        bag = [0 for _ in range(len(words))]

        s_words = nltk.word_tokenize(s)
        s_words = [stemmer.stem(word.lower()) for word in s_words]

        for se in s_words:
            for i, w in enumerate(words):
                if w == se:
                    bag[i] = 1

        return numpy.array(bag)

    def chat(self, message):
        results = self.model.predict([self.bag_of_words(message, self.words)])
        results_index = numpy.argmax(results)
        tag = self.labels[results_index]

        for tg in self.data["intents"]:
            if tg["tag"] == tag:
                responses = tg["responses"]

        return random.choice(responses)