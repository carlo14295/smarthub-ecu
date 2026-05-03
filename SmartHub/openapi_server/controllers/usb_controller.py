import connexion
import six

import RPi.GPIO as GPIO
import time
import numpy as np


from openapi_server.models.usb import Usb  # noqa: E501
from openapi_server import util

status_vector_usb=np.zeros(28)
usb_to_pin=[3,4,17,27,22,10,9,11]
                                                                  

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

GPIO.setup(2,GPIO.OUT)
GPIO.setup(3,GPIO.OUT)
GPIO.setup(4,GPIO.OUT)
GPIO.setup(17,GPIO.OUT)
GPIO.setup(27,GPIO.OUT)
GPIO.setup(22,GPIO.OUT)
GPIO.setup(10,GPIO.OUT)
GPIO.setup(9,GPIO.OUT)
GPIO.setup(11,GPIO.OUT)


GPIO.output(2,GPIO.LOW)
GPIO.output(3,GPIO.LOW)
GPIO.output(4,GPIO.LOW)
GPIO.output(17,GPIO.LOW)
GPIO.output(27,GPIO.LOW)
GPIO.output(22,GPIO.LOW)
GPIO.output(10,GPIO.LOW)
GPIO.output(9,GPIO.LOW)
GPIO.output(11,GPIO.LOW)


def get_all_usb():  # noqa: E501
    """Find all USB

    Returns all single usb # noqa: E501

   
    :rtype: Usb
    """
    matrix_values=[[1,status_vector_usb[3]],[2,status_vector_usb[4]],[3,status_vector_usb[17]],[4,status_vector_usb[27]],[5,status_vector_usb[22]],[6,status_vector_usb[10]],[7,status_vector_usb[9]],[8,status_vector_usb[11]]]                     
    return matrix_values

def get_usb_by_id(usb_id):  # noqa: E501
    """Find usb by ID

    Returns a single usb # noqa: E501

    :param usb_id: ID of usb to return
    :type usb_id: int

    :rtype: Usb
    """ 
    if status_vector_usb[usb_to_pin[usb_id-1]]==0:
        print('The Usb ',usb_id,' is LOW!')
    else:
        print('The Usb ',usb_id,' is HIGH!')
        
    return [usb_id,status_vector_usb[usb_to_pin[usb_id-1]]]

def put_usb_by_id(usb_id, value):  # noqa: E501
    """Find usb by ID

    Returns a single usb # noqa: E501

    :param usb_id: ID of usb to return
    :type usb_id: int
    :param value: Or Low or High
    :type value: str

    :rtype: Usb
    """
    global status_vector_usb
    if value=="low":
       status_vector_usb[usb_to_pin[usb_id-1]]=0
       GPIO.output(usb_to_pin[usb_id-1],GPIO.LOW)
       print('The Usb',usb_id,'is changed to LOW!')
    elif value=="high":
       status_vector_usb[usb_to_pin[usb_id-1]]=1
       GPIO.output(usb_to_pin[usb_id-1],GPIO.HIGH)
       print('The Usb',usb_id,'is changed to HIGH!')
    return [usb_id,status_vector_usb[usb_to_pin[usb_id-1]]]
