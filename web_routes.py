#!/usr/bin/python
# Code by JesseBot@Linux.com
# 2/11/16
# Production web routing bottle file

import bottle
from bottle import redirect, request, response, route
from bottle import run, static_file, template
import logging as log
import os
import sys
import yaml


def get_global_variable(global_variable):
    """ gets global variable given string variable name"""
    with open('./config/config.yaml', 'r') as f:
        doc = yaml.load(f)
    txt = doc["Globals"][global_variable]
    return txt

def get_global_variables():
    with open('./config/config.yaml', 'r') as f:
        doc = yaml.load(f)
    txt = doc["Globals"]
    return txt

# set logging
log.basicConfig(stream=sys.stderr, level=log.INFO)
log.info("logging config loaded")
# Grab site specific information
WEB_ROOT = get_global_variable('web_root')
# full path to HTML templates
bottle.TEMPLATE_PATH.insert(0,
                            '{0}/front_end/html_templates/'.format(WEB_ROOT))


@route('/')
def index():
    global_var_dict = get_global_variables()
    for key,value in global_var_dict.iteritems():
        key = value
    return template('index', global_var_dict=global_var_dict)

@route('/icons/<filename>')
def icons(filename):
    return static_file(filename,
                       root='{0}/front_end/icons'.format(WEB_ROOT))

@route('/js/<filename>')
def js(filename):
    return static_file(filename, root='{0}/front_end/js'.format(WEB_ROOT))


@route('/css/<filename>')
def css(filename):
    return static_file(filename, root='{0}/front_end/css'.format(WEB_ROOT))

@route('/fonts/<filename>')
def fonts(filename):
    return static_file(filename, root='{0}/front_end/fonts'.format(WEB_ROOT))


# example of how to create another route to something else
@route('/hate')
def hate():
    favicon = get_global_variable('favicon')
    browser_tab_title = get_global_variable('website_title')
    return template('hate', favicon=favicon,
                    browser_tab_title=browser_tab_title)
@route('/love')
def love():
    favicon = get_global_variable('favicon')
    browser_tab_title = get_global_variable('website_title')
    return template('love', favicon=favicon,
                    browser_tab_title=browser_tab_title)
