import connexion
import six

import RPi.GPIO as GPIO
import time

from openapi_server.models.power import Power  # noqa: E501
from openapi_server import util

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

GPIO.setup(5,GPIO.OUT)
GPIO.output(5, GPIO.LOW)
boot_mode=0


def get_boot():  # noqa: E501
    """Boot status

    modify boot status # noqa: E501


    :rtype: Boot
    """
    global boot_mode

    if (boot_mode==0):
        print('Boot off!')
    else:
        print('Boot on!')
    return boot_mode


def put_boot(value):  # noqa: E501
    """boot status

    modify boot status # noqa: E501

    :param value: Or Low or High
    :type value: str

    :rtype: Boot
    """
    global boot_mode

    if value=="low":
       GPIO.output(5, GPIO.LOW)
       print('The Boot is set to disactived')
       boot_mode=0
    elif value=="high":
       GPIO.output(5, GPIO.HIGH)
       print('The Boot is set to actived')
       boot_mode=1	
    return boot_mode
