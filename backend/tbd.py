import parser
f = open('code.py')
x = f.readlines()
print(parser.check_rec(x))
print(parser.check_nest(x))
print(parser.varinsideloop(x))
print(parser.numvar(x))
print(parser.unusedattr("code.py"))
