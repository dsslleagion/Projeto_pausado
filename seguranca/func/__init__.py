import os
import shlex
import subprocess


def listar_arquivos(pasta):
    comando = f'ls {pasta}'
    subprocess.run(shlex.split(comando), check=True)
