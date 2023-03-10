from codecarbon import OfflineEmissionsTracker
from flask import Flask , request , jsonify 
from flask_cors import CORS , cross_origin 
import json 
import csv
import dash 
import subprocess
import os 
import parser
import code

app = Flask(__name__)

#middlewares 
cors = CORS(app)




@app.route('/')
def hello_world():
   return "Hello World"

@app.route('/visualize' , methods = ['POST'] )
@cross_origin()
def visual():
    subprocess.run(["carbonboard", "--filepath='emissions.csv'", "--port=3333"])
    return "OK"


@app.route('/predict' , methods=['POST'])
@cross_origin()
def carbon(): 
    s = request.get_json(force=True)
    
    with open("sample.json", "w") as outfile:
        json.dump(s, outfile)
    a = s['code']
    b = s['language']

    if( b == 'python'):
        myfile = open("code.py",'w')
        myfile.write(a) 
        myfile.close()   
        #exec(open('code.py').read())  
        
        tracker = OfflineEmissionsTracker(country_iso_code="IND")
        tracker.start()
        #os.system('code.py')
        subprocess.call(" code.py 1", shell=True)
        # exec(open('code.py').read())
        tracker.stop()
        
        exec(open('csv2json.py').read())

        f = open("data.json")
        data = json.load(f) 
        return jsonify(data)
    elif(b == 'javascript'):
        path = 'C:\\Users\\b2200\\OneDrive\\Desktop\\Satya\\template\\t2.js'
        with open(path,'w') as f :
            f.write(a)
        tracker = OfflineEmissionsTracker(country_iso_code="IND")
        tracker.start()
        os.system('node t2.js')       
        tracker.stop()    
        exec(open('csv2json.py').read())
        f = open("data.json")
        data = json.load(f) 
        return jsonify(data)
    else:
        path = 'C:\\Users\\b2200\\OneDrive\\Desktop\\Satya\\template\\t.cpp'
        with open(path,'w') as f :
            f.write(a)
        tracker = OfflineEmissionsTracker(country_iso_code="IND")
        tracker.start()
        os.system('g++ t.cpp')
        os.system('a.exe')
        tracker.stop()    
        exec(open('csv2json.py').read())
        f = open("data.json")
        data = json.load(f) 
        return jsonify(data)
    
     

@app.route('/suggest' ,methods=['POST']) 
@cross_origin()
def suggestion():
    file1 = open('code.py', 'r')
    Lines = file1.readlines()
    sugg = []
    s = parser.check_rec(Lines)
    if s != "no sug":
        sugg.append(s)
    s = parser.check_nest(Lines)    
    if s != "no sug":
       sugg.append(s)
    s = parser.numvar(Lines)
    if s != "no sug":
       sugg.append(s) 
    s = parser.varinsideloop(Lines)
    if s != "no sug":
       sugg.append(s)

    # sugg.append(parser.unusedattr("code.py"))        

    newSuggestion = open("suggestion.json",'r')
    suggest = json.load(newSuggestion)
    newSuggestion.close()
    suggest['suggestions'] = sugg
    a_file = open("suggestion.json", "w")
    json.dump(suggest, a_file)
    a_file.close()

    return jsonify(suggest)

       
       

       


if __name__ == '__main__':
   app.run()

