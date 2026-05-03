# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.usb import Usb  # noqa: E501
from openapi_server.test import BaseTestCase


class TestUsbController(BaseTestCase):
    """UsbController integration test stubs"""

    def test_get_all_usb(self):
        """Test case for get_all_usb

        Find all USB
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/v2/usb',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_usb_by_id(self):
        """Test case for get_usb_by_id

        Find usb by ID
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/v2/usb/{usb_id}'.format(usb_id=56),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_put_usb_by_id(self):
        """Test case for put_usb_by_id

        Find usb by ID
        """
        query_string = [('value', 'value_example')]
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/v2/usb/{usb_id}'.format(usb_id=56),
            method='PUT',
            headers=headers,
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
