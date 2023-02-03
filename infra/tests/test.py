import boto3
import unittest


class TestS3(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = boto3.client("s3", endpoint_url="http://localstack:4566")

    def test_bucket(self):
        result = self.client.list_buckets()
        self.assertEqual(len(result["Buckets"]), 1, "Only a single bucket should exist")

        bucket = result["Buckets"][0]
        self.assertEqual(bucket["Name"], "vote", "Bucket should be named 'vote'")

    def test_acl(self):
        result = self.client.get_bucket_acl(Bucket="vote")
        group_grants = []
        for grant in result["Grants"]:
            if grant["Grantee"]["Type"] == "Group":
                group_grants.append(grant)

        self.assertEqual(
            len(group_grants), 1, "Only a single ACL Group grant should exist"
        )

        grant = group_grants[0]
        self.assertEqual(
            grant["Grantee"]["URI"],
            "http://acs.amazonaws.com/groups/global/AllUsers",
            "Grant should be to the AllUsers group",
        )
        self.assertEqual(grant["Permission"], "READ", "Grant should allow read access")


if __name__ == "__main__":
    unittest.main()
