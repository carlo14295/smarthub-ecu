import connexion
import six

import RPi.GPIO as GPIO
import time

from openapi_server.models.power import Power  # noqa: E501
from openapi_server import util

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

GPIO.setup(6,GPIO.OUT)
GPIO.output(6,GPIO.LOW)
power_mode=0

def get_power():  # noqa: E501
    """Power status

    modify power status # noqa: E501


    :rtype: Power
    """

    global power_mode

    if (power_mode==0):
        print('Power supply off!')
    else:
        print('Power supply on!')
    return power_mode


def put_power(value):  # noqa: E501
    """power status

    modify power status # noqa: E501

    :param value: Or low or high
    :type value: string

    :rtype: Power
    """

    global power_mode


    if value=="low":
       GPIO.output(6, GPIO.LOW)
       print('The Power Supply is set to disactived')
       power_mode=0
    elif value=="high":
       GPIO.output(6, GPIO.HIGH)
       print('The Power Supply is set to actived')
       power_mode=1	
    return power_mode
