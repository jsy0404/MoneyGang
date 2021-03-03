from setuptools import setup, find_packages

setup_requires = [
    ]

install_requires = [
    ]

dependency_links = [
    ]

setup(
    name='MoneyGang',
    version='0.1',
    description='Stock simulator',
    author='Yang JunSeok',
    author_email='pnmsegwyd@gmail.com',
    packages=find_packages(),
    install_requires=['pymongo', 'pandas', 'lxml'],
    )
