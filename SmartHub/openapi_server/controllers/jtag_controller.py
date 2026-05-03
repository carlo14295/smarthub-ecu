import connexion
import six

import RPi.GPIO as GPIO
import time

from openapi_server.models.power import Power  # noqa: E501
from openapi_server import util

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

GPIO.setup(20,GPIO.OUT)
GPIO.setup(21,GPIO.OUT)
GPIO.output(20,GPIO.HIGH)
GPIO.output(21,GPIO.HIGH)
jtag_mode=0


def get_jatg():  # noqa: E501
    """Jtag status

    modify jtag status # noqa: E501

    :rtype: Jtag
    """
    global jtag_mode

    if (jtag_mode==0):
        print('Jtag off!')
    else:
        print('Jtag on!')

    return jtag_mode


def put_jtag(value):  # noqa: E501
    """jtag status

    modify jtag status # noqa: E501

    :param value: Or Low or High
    :type value: str

    :rtype: Jtag
    """
    global jtag_mode

    if value=="low":
       GPIO.output(20, GPIO.HIGH)
       GPIO.output(21, GPIO.HIGH)
       print('The Jtag is set to disactived')
       jtag_mode=0
    elif value=="high":
       GPIO.output(20, GPIO.LOW)
       GPIO.output(21, GPIO.LOW)
       print('The Jtag is set to actived')
       jtag_mode=1	
    return jtag_mode
