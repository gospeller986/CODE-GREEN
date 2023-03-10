def unusedattr(x):
    import subprocess
    file_ = open('shell_output.txt', 'w+')
    subprocess.run('vulture '+ x, shell=True, stdout=file_)
    file_.close()
    ls = set()
    f = open('shell_output.txt', 'r')
    x = f.readlines()
    x = list(set(x))
    for i in range(len(x)):
        ls.add(x[i].split('(')[0].split(':')[-1])
    return " \n".join(ls)

def check_nest(x):
    cnt = 0
    ls = []
    idx = [-1]
    var = -1
    vars = []
    in_for = False
    for i in range(len(x)):
        t1 = x[i].find('for')
        t2 = x[i].find('while')
        t = max(t1,t2)
        if t != -1:
            in_for = True
            print(t)
            if t > idx[var]:
                cnt += 1
                idx.append(t)
                var = -1
            else:
                ls.append(cnt)
                if t in idx:
                    print(len(idx) - idx.index(t) - 1)
                    cnt -= len(idx) - idx.index(t) - 1
                    var = idx.index(t)
                else:
                    cnt = 1
                    idx.append(t)
                    var = -1
        if '=' in x[i] and '==' not in x[i] and '<=' not in x[i] and '>=' not in x[i] and '!=' not in x[i] and '+=' not in x[i] and '-=' not in x[i] and '*=' not in x[i] and '/=' not in x[i]:
            var_name = x[i].split("=")[0].strip()
            if var_name not in vars:
                vars.append(var_name)
            else:
                vars.remove(var_name)
    ls.append(cnt)
    if max(ls)>=2:
        return str(max(ls)) +" nested loops have been found in the given code which is having a significant impact on the its execution time....check if no of nested loops can be further reduced"
    else:
        return "no sug"

def numvar(x):
    ls = set()
    for i in range(len(x)):
        if '=' in x[i] and '==' not in x[i] and '<=' not in x[i] and '>=' not in x[i] and '!=' not in x[i] and '+=' not in x[i] and '-=' not in x[i] and '*=' not in x[i] and '/=' not in x[i]:
            var_name = x[i].split("=")[0].strip()
            ls.add(var_name)
    if len(ls)>=8:
        return "Try reducing the number of variables"
    else:
        return "no sug"

def varinsideloop(x):
    lt = []
    vars = []
    varmap = {}
    for i in range(len(x)):
        t1 = x[i].find('for')
        t2 = x[i].find('while')
        t = max(t1, t2)
        if t!= -1:
            lt.append(t)
        if '=' in x[i] and '==' not in x[i] and '<=' not in x[i] and '>=' not in x[i] and '!=' not in x[i] and '+=' not in x[i] and '-=' not in x[i] and '*=' not in x[i] and '/=' not in x[i] and (len(x[i]) - len(x[i].lstrip()))!=0:
            var_name = x[i].split("=")[0].strip()
            if var_name not in vars and x[i].split("=")[1].strip().isnumeric() == True:
                vars.append(var_name)
                varmap[var_name] = len(x[i]) - len(x[i].lstrip())
            elif var_name in vars:
                if len(x[i]) - len(x[i].lstrip()) < varmap[var_name]:
                    pass
                else:
                    vars.remove(var_name)
        if '+=' in x[i] or '-=' in x[i] or '*=' in x[i] or '/=' in x[i]:
            if '+=' in x[i]:
                v = x[i].split("+=")[0].strip()
                if v in vars:
                    if len(x[i]) - len(x[i].lstrip()) < varmap[var_name]:
                        pass
                    else:
                        vars.remove(var_name)
            elif '-=' in x[i]:
                v = x[i].split("-=")[0].strip()
                if v in vars:
                    if len(x[i]) - len(x[i].lstrip()) < varmap[var_name]:
                        pass
                    else:
                        vars.remove(var_name)
            elif '*=' in x[i]:
                v = x[i].split("*=")[0].strip()
                if v in vars:
                    if len(x[i]) - len(x[i].lstrip()) < varmap[var_name]:
                        pass
                    else:
                        vars.remove(var_name)
            elif '/=' in x[i]:
                v = x[i].split("/=")[0].strip()
                if v in vars:
                    if len(x[i]) - len(x[i].lstrip()) < varmap[var_name]:
                        pass
                    else:
                        vars.remove(var_name)

    if len(vars) == 0:
        return "no sug"
    else:
        return "Avoid Assigning values to variables inside the loop if they are not updated after each iteration"


def check_rec(x):
    isrec = False
    name = ""
    t = 0
    for i in range(len(x)):
        if 'def' in x[i]:
            name = x[i].split('(')[0].split(" ")[-1]
            t = len(x[i + 1]) - len(x[i + 1].lstrip())
        for j in range(i + 1, len(x)):
            if len(x[j]) - len(x[j].lstrip()) == 0:
                i = j
                break
            else:
                if name in x[j]:
                    isrec = True
                    return "A Recursive function is Found.It is advisable to use to dyanamic programming to reduce time complexity"
    return "no sug"